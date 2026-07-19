from flask import request, jsonify
from sqlalchemy import func

from extensions import db

from models.subject_model import Subject
from models.question_model import Question


def get_subjects():

    subjects = (
        db.session.query(
            Subject,
            func.count(Question.id).label("total_questions")
        )
        .outerjoin(
            Question,
            (Question.subject_id == Subject.id) &
            (Question.is_deleted == False)
        )
        .filter(
            Subject.is_deleted == False
        )
        .group_by(Subject.id)
        .all()
    )

    response = []

    for subject, total_questions in subjects:

        response.append({

            "id": subject.id,

            "name": subject.name,

            "description": subject.description,

            "total_questions": total_questions

        })

    return jsonify(response)


def create_subject():

    data = request.get_json()

    subject = Subject(

        name=data["name"],

        description=data["description"]

    )

    db.session.add(subject)

    db.session.commit()

    return jsonify({

        "message": "Subject Created"

    })


def update_subject(subject_id):

    subject = Subject.query.get(subject_id)

    if not subject:

        return jsonify({

            "message": "Subject not found"

        }),404

    data=request.get_json()

    subject.name=data["name"]

    subject.description=data["description"]

    db.session.commit()

    return jsonify({

        "message":"Subject Updated"

    })


def delete_subject(subject_id):

    subject=Subject.query.get(subject_id)

    if not subject:

        return jsonify({

            "message":"Subject not found"

        }),404

    subject.is_deleted=True

    db.session.commit()

    return jsonify({

        "message":"Subject Deleted"

    })