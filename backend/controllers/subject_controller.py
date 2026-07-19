from flask import request, jsonify
from sqlalchemy import func

from extensions import db

from models.subject_model import Subject
from models.question_model import Question


# ==========================
# Get Subjects
# ==========================

from flask import request, jsonify
from sqlalchemy import func

from extensions import db
from models.subject_model import Subject
from models.question_model import Question


def get_subjects():

    search = request.args.get("search", "").strip()

    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("per_page", 10, type=int)

    query = (

        db.session.query(

            Subject,

            func.count(
                Question.id
            ).label("total_questions")

        )

        .outerjoin(

            Question,

            (Question.subject_id == Subject.id) &

            (Question.is_deleted == False)

        )

        .filter(

            Subject.is_deleted == False

        )

    )

    if search:

        query = query.filter(

            Subject.name.ilike(

                f"%{search}%"

            )

        )

    query = query.group_by(
        Subject.id
    ).order_by(
        Subject.id.desc()
    )

    pagination = query.paginate(

        page=page,

        per_page=per_page,

        error_out=False

    )

    response = []

    for subject, total_questions in pagination.items:

        response.append({

            "id": subject.id,

            "name": subject.name,

            "description": subject.description,

            "total_questions": total_questions

        })

    return jsonify({

        "subjects": response,

        "pagination": {

            "page": pagination.page,

            "per_page": pagination.per_page,

            "total": pagination.total,

            "total_pages": pagination.pages

        }

    })
# ==========================
# Create Subject
# ==========================

def create_subject():

    data = request.get_json()

    if not data:

        return jsonify({

            "message": "Invalid request."

        }), 400

    name = data.get(
        "name",
        ""
    ).strip()

    description = data.get(
        "description",
        ""
    ).strip()

    if not name:

        return jsonify({

            "message": "Subject name is required."

        }), 400

    existing = Subject.query.filter(

        Subject.name.ilike(name),

        Subject.is_deleted == False

    ).first()

    if existing:

        return jsonify({

            "message": "Subject already exists."

        }), 400

    subject = Subject(

        name=name,

        description=description

    )

    db.session.add(subject)

    db.session.commit()

    return jsonify({

        "message": "Subject created successfully.",

        "subject": {

            "id": subject.id,

            "name": subject.name,

            "description": subject.description

        }

    }), 201


# ==========================
# Update Subject
# ==========================

def update_subject(subject_id):

    subject = Subject.query.get(subject_id)

    if not subject:

        return jsonify({

            "message": "Subject not found."

        }), 404

    data = request.get_json()

    if not data:

        return jsonify({

            "message": "Invalid request."

        }), 400

    name = data.get(
        "name",
        ""
    ).strip()

    description = data.get(
        "description",
        ""
    ).strip()

    if not name:

        return jsonify({

            "message": "Subject name is required."

        }), 400

    existing = Subject.query.filter(

        Subject.id != subject.id,

        Subject.name.ilike(name),

        Subject.is_deleted == False

    ).first()

    if existing:

        return jsonify({

            "message": "Subject already exists."

        }), 400

    subject.name = name

    subject.description = description

    db.session.commit()

    return jsonify({

        "message": "Subject updated successfully.",

        "subject": {

            "id": subject.id,

            "name": subject.name,

            "description": subject.description

        }

    })


# ==========================
# Delete Subject
# ==========================

def delete_subject(subject_id):

    subject = Subject.query.get(subject_id)

    if not subject:

        return jsonify({

            "message": "Subject not found."

        }), 404

    subject.is_deleted = True

    db.session.commit()

    return jsonify({

        "message": "Subject deleted successfully."

    })