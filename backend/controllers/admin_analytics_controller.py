from flask import jsonify

from sqlalchemy import func
from extensions import db

from models.user_model import User
from models.subject_model import Subject
from models.question_model import Question
from models.result_model import QuizResult


def get_dashboard_analytics():

    total_users = User.query.filter_by(
        is_active=True
    ).count()

    total_subjects = Subject.query.filter_by(
        is_deleted=False
    ).count()

    total_questions = Question.query.filter_by(
        is_deleted=False
    ).count()

    total_attempts = QuizResult.query.count()

    average_score = db.session.query(
        func.avg(
            QuizResult.percentage
        )
    ).scalar() or 0

    active_admins = User.query.filter_by(
        role="admin",
        is_active=True
    ).count()

    recent_attempts = (

        QuizResult.query

        .order_by(
            QuizResult.created_at.desc()
        )

        .limit(10)

        .all()

    )

    recent = []

    for attempt in recent:

        recent.append({

            "id": attempt.id,

            "user":

            attempt.user.full_name,

            "subject":

            attempt.subject.name,

            "score":

            attempt.score,

            "percentage":

            attempt.percentage,

            "date":

            attempt.created_at.strftime(
                "%d %b %Y %I:%M %p"
            )

        })

    top_students_query = (

        db.session.query(

            User.id,

            User.full_name,

            func.avg(
                QuizResult.percentage
            ).label("average"),

            func.count(
                QuizResult.id
            ).label("attempts")

        )

        .join(

            QuizResult,

            User.id == QuizResult.user_id

        )

        .group_by(

            User.id

        )

        .order_by(

            func.avg(
                QuizResult.percentage
            ).desc()

        )

        .limit(10)

        .all()

    )

    top_students = []

    for student in top_students_query:

        top_students.append({

            "id": student.id,

            "name": student.full_name,

            "average": round(

                student.average,

                2

            ),

            "attempts": student.attempts

        })

    subject_query = (

        db.session.query(

            Subject.name,

            func.count(
                QuizResult.id
            ).label("attempts")

        )

        .join(

            QuizResult,

            Subject.id == QuizResult.subject_id

        )

        .group_by(

            Subject.id

        )

        .order_by(

            func.count(
                QuizResult.id
            ).desc()

        )

        .all()

    )

    subjects = []

    for item in subject_query:

        subjects.append({

            "name": item.name,

            "attempts": item.attempts

        })

    return jsonify({

        "statistics": {

            "total_users": total_users,

            "total_subjects": total_subjects,

            "total_questions": total_questions,

            "total_attempts": total_attempts,

            "average_score": round(

                average_score,

                2

            ),

            "active_admins": active_admins

        },

        "top_students":

        top_students,

        "subject_attempts":

        subjects,

        "recent_attempts":

        recent

    })