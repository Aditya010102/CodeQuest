from flask import Blueprint

from decorators.admin_required import admin_required

from controllers.admin_analytics_controller import (
    get_dashboard_analytics
)

analytics_bp = Blueprint(
    "analytics_bp",
    __name__
)

analytics_bp.route(
    "",
    methods=["GET"]
)(
    admin_required(get_dashboard_analytics)
)