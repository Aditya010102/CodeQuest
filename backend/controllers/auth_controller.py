from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

from extensions import db
from models.user_model import User


def register_user():

    data = request.get_json()

    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "message": "Email already exists"
        }), 400

    hashed_password = generate_password_hash(password)

    new_user = User(
        full_name=full_name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    }), 201


def login_user():

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "message": "Invalid email"
        }), 401

    if not check_password_hash(user.password, password):
        return jsonify({
            "message": "Invalid password"
        }), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }), 200