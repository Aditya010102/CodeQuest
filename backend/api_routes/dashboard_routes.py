from flask import Blueprint

from controllers.dashboard_controller import dashboard

dashboard_bp = Blueprint(

    "dashboard_bp",

    __name__

)

dashboard_bp.route(

    "/<int:user_id>",

    methods=["GET"]

)(dashboard)