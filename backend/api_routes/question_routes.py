from flask import Blueprint

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
)(get_questions_by_subject)

# -------------------------
# Admin Panel
# -------------------------

question_bp.route(
    "/",
    methods=["GET"]
)(get_questions)

question_bp.route(
    "/",
    methods=["POST"]
)(create_question)

question_bp.route(
    "/<int:question_id>",
    methods=["PUT"]
)(update_question)

question_bp.route(
    "/<int:question_id>",
    methods=["DELETE"]
)(delete_question)