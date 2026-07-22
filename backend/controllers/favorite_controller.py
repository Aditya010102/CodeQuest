from flask import request, jsonify

from extensions import db

from models.favorite_model import FavoriteQuestion
from flask_jwt_extended import get_jwt_identity


def add_favorite():

    data = request.get_json()

    user_id = get_jwt_identity()
    question_id = data.get("question_id")

    if not question_id:

        return jsonify({
            "message": "user_id and question_id are required."
        }), 400

    favorite = FavoriteQuestion.query.filter_by(
        user_id=user_id,
        question_id=question_id
    ).first()

    # Already exists

    if favorite:

        if favorite.is_deleted:

            favorite.is_deleted = False
            db.session.commit()

            return jsonify({
                "message": "Favorite restored."
            }), 200

        return jsonify({
            "message": "Question already bookmarked."
        }), 200

    favorite = FavoriteQuestion(

        user_id=user_id,

        question_id=question_id

    )

    db.session.add(favorite)

    db.session.commit()

    return jsonify({

        "message": "Question bookmarked successfully."

    }), 201


def get_user_favorites():

    user_id = get_jwt_identity()

    favorites = FavoriteQuestion.query.filter_by(

        user_id=user_id,

        is_deleted=False

    ).all()

    response = []

    for favorite in favorites:

        question = favorite.question

        response.append({

            "id": favorite.id,

            "question_id": question.id,

            "question": question.question_text,

            "difficulty": question.difficulty,

            "marks": question.marks,

            "subject": {

                "id": question.subject.id,

                "name": question.subject.name

            },

            "created_at": favorite.created_at.strftime(

                "%Y-%m-%d %H:%M:%S"

            )

        })

    return jsonify(response)


def remove_favorite(favorite_id):

    favorite = FavoriteQuestion.query.get(favorite_id)

    if not favorite:

        return jsonify({

            "message": "Favorite not found."

        }), 404

    favorite.is_deleted = True

    db.session.commit()

    return jsonify({

        "message": "Favorite removed."

    })