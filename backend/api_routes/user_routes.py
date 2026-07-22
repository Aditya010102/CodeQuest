from flask import Blueprint

from decorators.admin_required import admin_required

from controllers.user_controller import (
    get_users,
    update_user_role,
    update_user_status
)

user_bp = Blueprint(
    "user_bp",
    __name__
)

user_bp.route(
    "",
    methods=["GET"]
)(
    admin_required(get_users)
)

user_bp.route(
    "/<int:user_id>/role",
    methods=["PUT"]
)(
    admin_required(update_user_role)
)

user_bp.route(
    "/<int:user_id>/status",
    methods=["PUT"]
)(
    admin_required(update_user_status)
)