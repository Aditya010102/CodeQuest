from flask import Blueprint

from controllers.admin_dashboard_controller import (
    admin_dashboard
)

admin_dashboard_bp = Blueprint(
    "admin_dashboard_bp",
    __name__
)

admin_dashboard_bp.route(
    "",
    methods=["GET"]
)(
    admin_dashboard
)