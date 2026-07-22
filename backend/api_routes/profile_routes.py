from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.profile_controller import (
    get_profile,
    update_profile,
    change_password
)

profile_bp = Blueprint(
    "profile_bp",
    __name__
)

profile_bp.route(
    "",
    methods=["GET"]
)(
    jwt_required()(get_profile)
)

profile_bp.route(
    "",
    methods=["PUT"]
)(
    jwt_required()(update_profile)
)

profile_bp.route(
    "/change-password",
    methods=["PUT"]
)(
    jwt_required()(change_password)
)