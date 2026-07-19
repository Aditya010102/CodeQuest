from flask import request, jsonify

from extensions import db

from models.result_model import QuizResult


def save_result():

    data = request.get_json()

    required_fields = [

        "user_id",
        "subject_id",
        "total_questions",
        "attempted_questions",
        "correct_answers",
        "wrong_answers",
        "score",
        "percentage"

    ]

    for field in required_fields:

        if field not in data:

            return jsonify({

                "message": f"{field} is required"

            }), 400

    result = QuizResult(

        user_id=data["user_id"],

        subject_id=data["subject_id"],

        total_questions=data["total_questions"],

        attempted_questions=data["attempted_questions"],

        correct_answers=data["correct_answers"],

        wrong_answers=data["wrong_answers"],

        score=data["score"],

        percentage=data["percentage"]

    )

    db.session.add(result)

    db.session.commit()

    return jsonify({

        "message": "Quiz Result Saved"

    }), 201


def get_user_results(user_id):

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