from flask import Blueprint

from controllers.leaderboard_controller import leaderboard

leaderboard_bp = Blueprint(

    "leaderboard_bp",

    __name__

)

leaderboard_bp.route(

    "",

    methods=["GET"]

)(leaderboard)