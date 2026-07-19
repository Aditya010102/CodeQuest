from flask import Blueprint

from controllers.subject_controller import (
    get_subjects,
    create_subject,
    update_subject,
    delete_subject
)

subject_bp = Blueprint(
    "subject_bp",
    __name__
)

subject_bp.route(
    "/",
    methods=["GET"]
)(get_subjects)

subject_bp.route(
    "/",
    methods=["POST"]
)(create_subject)

subject_bp.route(
    "/<int:subject_id>",
    methods=["PUT"]
)(update_subject)

subject_bp.route(
    "/<int:subject_id>",
    methods=["DELETE"]
)(delete_subject)