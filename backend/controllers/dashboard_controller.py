from flask import jsonify
from sqlalchemy import func

from models.result_model import QuizResult
from extensions import db


def dashboard(user_id):

    total_quizzes = QuizResult.query.filter_by(
        user_id=user_id
    ).count()

    average_score = db.session.query(
        func.avg(QuizResult.percentage)
    ).filter_by(
        user_id=user_id
    ).scalar()

    highest_score = db.session.query(
        func.max(QuizResult.percentage)
    ).filter_by(
        user_id=user_id
    ).scalar()

    recent_attempts = QuizResult.query.filter_by(
        user_id=user_id
    ).order_by(
        QuizResult.id.desc()
    ).limit(5).all()

    response = []

    for item in recent_attempts:

        response.append({

            "subject_name": item.subject.name,

            "score": item.score,

            "percentage": item.percentage,

            "date": item.created_at

        })

    return jsonify({

        "total_quizzes": total_quizzes,

        "average_score": average_score or 0,

        "highest_score": highest_score or 0,

        "recent_attempts": response

    })