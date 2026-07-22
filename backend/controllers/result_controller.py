from flask import request, jsonify

from extensions import db

from models.result_model import QuizResult
from sqlalchemy import or_

from models.user_model import User
from models.subject_model import Subject

from models.result_answer_model import ResultAnswer
from models.question_model import Question
from models.question_option_model import QuestionOption
from flask_jwt_extended import get_jwt_identity


def save_result():

    data = request.get_json()

    user_id = get_jwt_identity()
    subject_id = data.get("subject_id")
    answers = data.get("answers", [])

    if not subject_id:

        return jsonify({
            "message": "Invalid request"
        }), 400

    total_questions = len(answers)
    attempted_questions = 0
    correct_answers = 0
    wrong_answers = 0

    result = QuizResult(
        user_id=user_id,
        subject_id=subject_id,
        total_questions=0,
        attempted_questions=0,
        correct_answers=0,
        wrong_answers=0,
        score=0,
        percentage=0
    )

    db.session.add(result)
    db.session.flush()

    for item in answers:

        selected_option = item.get("selected_option_id")

        if selected_option is None:
            continue

        attempted_questions += 1

        option = QuestionOption.query.get(selected_option)

        is_correct = False

        if option and option.is_correct:
            correct_answers += 1
            is_correct = True
        else:
            wrong_answers += 1

        db.session.add(

            ResultAnswer(

                result_id=result.id,

                question_id=item["question_id"],

                selected_option_id=selected_option,

                is_correct=is_correct

            )

        )

    total_questions = len(answers)

    percentage = 0

    if total_questions > 0:
        percentage = round(
            (correct_answers / total_questions) * 100,
            2
        )

    result.total_questions = total_questions
    result.attempted_questions = attempted_questions
    result.correct_answers = correct_answers
    result.wrong_answers = wrong_answers
    result.score = correct_answers
    result.percentage = percentage

    db.session.commit()

    return jsonify({

    "message": "Quiz Result Saved",

    "result_id": result.id,

    "score": result.score,

    "percentage": result.percentage,

    "correct_answers": result.correct_answers,

    "wrong_answers": result.wrong_answers,

    "attempted_questions": result.attempted_questions,

    "total_questions": result.total_questions

}), 201


def get_user_results():

    user_id = get_jwt_identity()

    results = QuizResult.query.filter_by(

        user_id=user_id

    ).order_by(

        QuizResult.created_at.desc()

    ).all()

    response = []

    for result in results:

        response.append({

            "id": result.id,

            "subject": {

                "id": result.subject.id if result.subject else None,

                "name": result.subject.name if result.subject else "Unknown"

            },

            "score": result.score,

            "percentage": result.percentage,

            "correct_answers": result.correct_answers,

            "wrong_answers": result.wrong_answers,

            "attempted_questions": result.attempted_questions,

            "created_at": result.created_at.strftime("%Y-%m-%d %H:%M:%S")

        })

    return jsonify(response), 200

def get_all_results():

    search = request.args.get("search", "").strip()

    user_id = request.args.get("user_id", type=int)

    subject_id = request.args.get("subject_id", type=int)

    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("per_page", 10, type=int)

    query = QuizResult.query.join(User).join(Subject)

    if search:

        query = query.filter(

            or_(

                User.full_name.ilike(f"%{search}%"),

                User.email.ilike(f"%{search}%"),

                Subject.name.ilike(f"%{search}%")

            )

        )

    if user_id:

        query = query.filter(

            QuizResult.user_id == user_id

        )

    if subject_id:

        query = query.filter(

            QuizResult.subject_id == subject_id

        )

    query = query.order_by(

        QuizResult.created_at.desc()

    )

    pagination = query.paginate(

        page=page,

        per_page=per_page,

        error_out=False

    )

    results = []

    for result in pagination.items:

        results.append({

            "id": result.id,

            "user_id": result.user.id,

            "user_name": result.user.full_name,

            "subject_id": result.subject.id,

            "subject_name": result.subject.name,

            "score": result.score,

            "percentage": result.percentage,

            "correct_answers": result.correct_answers,

            "wrong_answers": result.wrong_answers,

            "attempted_questions": result.attempted_questions,

            "total_questions": result.total_questions,

            "created_at": result.created_at.strftime("%d %b %Y %I:%M %p")

        })

    total_results = QuizResult.query.count()

    average_percentage = db.session.query(

        db.func.avg(

            QuizResult.percentage

        )

    ).scalar() or 0

    return jsonify({

        "results": results,

        "pagination": {

            "page": pagination.page,

            "per_page": pagination.per_page,

            "total": pagination.total,

            "total_pages": pagination.pages

        },

        "statistics": {

            "total_results": total_results,

            "average_percentage": round(

                average_percentage,

                2

            )

        }

    })

def get_result_details(result_id):

    result = QuizResult.query.get_or_404(result_id)

    answers = []

    for item in result.answers:

        correct_option = QuestionOption.query.filter_by(

            question_id=item.question_id,

            is_correct=True

        ).first()

        answers.append({

            "question": item.question.question_text,

            "selected_answer": item.selected_option.option_text,

            "correct_answer": correct_option.option_text if correct_option else "",

            "is_correct": item.is_correct

        })

    return jsonify({

        "result": {

            "id": result.id,

            "user": result.user.full_name,

            "email": result.user.email,

            "subject": result.subject.name,

            "score": result.score,

            "percentage": result.percentage,

            "correct_answers": result.correct_answers,

            "wrong_answers": result.wrong_answers,

            "attempted_questions": result.attempted_questions,

            "total_questions": result.total_questions,

            "created_at": result.created_at.strftime("%d %b %Y %I:%M %p")

        },

        "answers": answers

    })