from flask import jsonify
from sqlalchemy import func

from extensions import db

from models.user_model import User
from models.subject_model import Subject
from models.question_model import Question
from models.result_model import QuizResult


def admin_dashboard():

    total_users = User.query.count()

    total_subjects = Subject.query.filter_by(
        is_deleted=False
    ).count()

    total_questions = Question.query.filter_by(
        is_deleted=False
    ).count()

    total_attempts = QuizResult.query.count()

    recent_users = User.query.order_by(
        User.id.desc()
    ).limit(5).all()

    recent_results = QuizResult.query.order_by(
        QuizResult.created_at.desc()
    ).limit(5).all()

    return jsonify({

        "total_users": total_users,

        "total_subjects": total_subjects,

        "total_questions": total_questions,

        "total_attempts": total_attempts,

        "recent_users": [

            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role
            }

            for user in recent_users

        ],

        "recent_results": [

            {

                "user": result.user.full_name,

                "subject": result.subject.name,

                "score": result.score,

                "percentage": result.percentage,

                "date": result.created_at.strftime("%d %b %Y")

            }

            for result in recent_results

        ]

    })