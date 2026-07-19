from flask import request, jsonify

from extensions import db

from models.user_model import User
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

def get_profile(user_id):

    user = User.query.get(user_id)

    if not user:

        return jsonify({

            "message":"User not found"

        }),404

    return jsonify({

        "id":user.id,

        "full_name":user.full_name,

        "email":user.email,

        "role":user.role

    })


def update_profile(user_id):

    user = User.query.get(user_id)

    if not user:

        return jsonify({

            "message":"User not found"

        }),404

    data = request.get_json()

    user.full_name = data["full_name"]

    db.session.commit()

    return jsonify({

        "message":"Profile Updated"

    })

def change_password(user_id):

    user = User.query.get(user_id)

    if not user:

        return jsonify({

            "message": "User not found"

        }),404

    data = request.get_json()

    current_password = data.get("current_password")

    new_password = data.get("new_password")

    if not current_password or not new_password:

        return jsonify({

            "message":"All fields are required."

        }),400

    if not check_password_hash(

        user.password,

        current_password

    ):

        return jsonify({

            "message":"Current password is incorrect."

        }),400

    user.password = generate_password_hash(

        new_password

    )

    db.session.commit()

    return jsonify({

        "message":"Password changed successfully."

    }),200