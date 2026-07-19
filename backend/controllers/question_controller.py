from flask import request, jsonify
from sqlalchemy import or_

from extensions import db

from models.question_model import Question
from models.question_option_model import QuestionOption
from models.subject_model import Subject


# ======================================
# ADMIN - GET QUESTIONS
# ======================================

def get_questions():

    search = request.args.get("search", "").strip()

    subject_id = request.args.get("subject_id", type=int)

    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("per_page", 10, type=int)

    query = Question.query.filter_by(
        is_deleted=False
    )

    if subject_id:

        query = query.filter(
            Question.subject_id == subject_id
        )

    if search:

        query = query.filter(

            Question.question_text.ilike(
                f"%{search}%"
            )

        )

    query = query.order_by(
        Question.id.desc()
    )

    pagination = query.paginate(

        page=page,

        per_page=per_page,

        error_out=False

    )

    response = []

    for question in pagination.items:

        response.append({

            "id": question.id,

            "subject_id": question.subject_id,

            "subject_name": question.subject.name,

            "question_text": question.question_text,

            "difficulty": question.difficulty,

            "marks": question.marks,

            "options": [

                {

                    "id": option.id,

                    "text": option.option_text,

                    "is_correct": option.is_correct

                }

                for option in question.options

            ]

        })

    return jsonify({

        "questions": response,

        "pagination": {

            "page": pagination.page,

            "per_page": pagination.per_page,

            "total": pagination.total,

            "total_pages": pagination.pages

        }

    })


# ======================================
# STUDENT QUIZ
# ======================================

def get_questions_by_subject(subject_id):

    questions = Question.query.filter_by(

        subject_id=subject_id,

        is_deleted=False

    ).all()

    response = []

    for question in questions:

        response.append({

            "id": question.id,

            "subject_id": question.subject_id,

            "question_text": question.question_text,

            "difficulty": question.difficulty,

            "marks": question.marks,

            "options": [

                {

                    "id": option.id,

                    "text": option.option_text,

                    "is_correct": option.is_correct

                }

                for option in question.options

            ]

        })

    return jsonify(response)


# ======================================
# CREATE QUESTION
# ======================================

def create_question():

    data = request.get_json()

    if not data:

        return jsonify({

            "message": "Invalid request."

        }), 400

    if not data.get("subject_id"):

        return jsonify({

            "message": "Subject is required."

        }), 400

    subject = Subject.query.get(

        data["subject_id"]

    )

    if not subject:

        return jsonify({

            "message": "Subject not found."

        }), 404

    question_text = data.get(

        "question_text",

        ""

    ).strip()

    if not question_text:

        return jsonify({

            "message": "Question is required."

        }), 400

    options = data.get(

        "options",

        []

    )

    if len(options) != 4:

        return jsonify({

            "message": "Exactly four options are required."

        }), 400

    correct = sum(

        1 for option in options

        if option["is_correct"]

    )

    if correct != 1:

        return jsonify({

            "message": "Exactly one correct answer is required."

        }), 400

    if data.get("difficulty") not in [

        "Easy",

        "Medium",

        "Hard"

    ]:

        return jsonify({

            "message": "Invalid difficulty."

        }), 400

    if int(data.get("marks", 0)) <= 0:

        return jsonify({

            "message": "Marks must be greater than zero."

        }), 400

    question = Question(

        subject_id=data["subject_id"],

        question_text=question_text,

        difficulty=data["difficulty"],

        marks=data["marks"]

    )

    db.session.add(question)

    db.session.flush()

    for option in options:

        db.session.add(

            QuestionOption(

                question_id=question.id,

                option_text=option["text"].strip(),

                is_correct=option["is_correct"]

            )

        )

    db.session.commit()

    return jsonify({

        "message": "Question created successfully."

    }), 201


# ======================================
# UPDATE QUESTION
# ======================================

def update_question(question_id):

    question = Question.query.get(question_id)

    if not question:

        return jsonify({

            "message": "Question not found."

        }), 404

    data = request.get_json()

    if not data:

        return jsonify({

            "message": "Invalid request."

        }), 400

    subject = Subject.query.get(

        data["subject_id"]

    )

    if not subject:

        return jsonify({

            "message": "Subject not found."

        }), 404

    options = data.get("options", [])

    if len(options) != 4:

        return jsonify({

            "message": "Exactly four options are required."

        }), 400

    correct = sum(

        1 for option in options

        if option["is_correct"]

    )

    if correct != 1:

        return jsonify({

            "message": "Exactly one correct answer is required."

        }), 400

    question.subject_id = data["subject_id"]

    question.question_text = data["question_text"].strip()

    question.difficulty = data["difficulty"]

    question.marks = data["marks"]

    QuestionOption.query.filter_by(

        question_id=question.id

    ).delete()

    for option in options:

        db.session.add(

            QuestionOption(

                question_id=question.id,

                option_text=option["text"].strip(),

                is_correct=option["is_correct"]

            )

        )

    db.session.commit()

    return jsonify({

        "message": "Question updated successfully."

    })


# ======================================
# DELETE QUESTION
# ======================================

def delete_question(question_id):

    question = Question.query.get(question_id)

    if not question:

        return jsonify({

            "message": "Question not found."

        }), 404

    question.is_deleted = True

    db.session.commit()

    return jsonify({

        "message": "Question deleted successfully."

    })