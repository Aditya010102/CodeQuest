from flask import Blueprint

from controllers.result_controller import (
    save_result,
    get_user_results
)

result_bp = Blueprint(
    "result_bp",
    __name__
)

result_bp.route(
    "",
    methods=["POST"]
)(save_result)

result_bp.route(
    "/user/<int:user_id>",
    methods=["GET"]
)(get_user_results)