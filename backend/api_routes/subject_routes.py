from flask import Blueprint
from flask_jwt_extended import jwt_required

from decorators.admin_required import admin_required

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

# Student + Admin
subject_bp.route(
    "/",
    methods=["GET"]
)(
    jwt_required()(get_subjects)
)

# Admin only
subject_bp.route(
    "/",
    methods=["POST"]
)(
    admin_required(create_subject)
)

# Admin only
subject_bp.route(
    "/<int:subject_id>",
    methods=["PUT"]
)(
    admin_required(update_subject)
)

# Admin only
subject_bp.route(
    "/<int:subject_id>",
    methods=["DELETE"]
)(
    admin_required(delete_subject)
)