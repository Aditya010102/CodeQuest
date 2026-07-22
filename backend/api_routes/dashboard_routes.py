from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.dashboard_controller import dashboard

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)

dashboard_bp.route(
    "",
    methods=["GET"]
)(
    jwt_required()(dashboard)
)