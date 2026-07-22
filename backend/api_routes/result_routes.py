from flask import Blueprint
from flask_jwt_extended import jwt_required

from decorators.admin_required import admin_required

from controllers.result_controller import (
    get_result_details,
    save_result,
    get_user_results,
    get_all_results,
)

result_bp = Blueprint(
    "result_bp",
    __name__
)

# Student
result_bp.route(
    "",
    methods=["POST"]
)(
    jwt_required()(save_result)
)

# Admin
result_bp.route(
    "",
    methods=["GET"]
)(
    admin_required(get_all_results)
)

# Student
result_bp.route(
    "/my",
    methods=["GET"]
)(
    jwt_required()(get_user_results)
)

# Student
result_bp.route(
    "/<int:result_id>",
    methods=["GET"]
)(
    jwt_required()(get_result_details)
)