from flask import Blueprint
from flask_jwt_extended import jwt_required

from decorators.admin_required import admin_required

from controllers.question_controller import *

question_bp = Blueprint(
    "question_bp",
    __name__
)

# -------------------------
# Student Quiz
# -------------------------

question_bp.route(
    "/<int:subject_id>",
    methods=["GET"]
)(
    jwt_required()(get_questions_by_subject)
)

# -------------------------
# Admin Panel
# -------------------------

question_bp.route(
    "",
    methods=["GET"]
)(
    admin_required(get_questions)
)

question_bp.route(
    "/",
    methods=["POST"]
)(
    admin_required(create_question)
)

question_bp.route(
    "/<int:question_id>",
    methods=["PUT"]
)(
    admin_required(update_question)
)

question_bp.route(
    "/<int:question_id>",
    methods=["DELETE"]
)(
    admin_required(delete_question)
)