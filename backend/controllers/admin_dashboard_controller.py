from flask import jsonify

from models.user_model import User
from models.subject_model import Subject
from models.question_model import Question
from models.result_model import QuizResult


def admin_dashboard():

    total_users = User.query.count()

    total_subjects = Subject.query.count()

    total_questions = Question.query.count()

    total_results = QuizResult.query.count()

    recent_results = QuizResult.query.order_by(

        QuizResult.created_at.desc()

    ).limit(5).all()

    response = []

    for result in recent_results:

        response.append({

            "user": result.user.full_name,

            "subject": result.subject.name,

            "score": result.score,

            "percentage": result.percentage,

            "date": result.created_at

        })

    return jsonify({

        "total_users": total_users,

        "total_subjects": total_subjects,

        "total_questions": total_questions,

        "total_results": total_results,

        "recent_results": response

    })