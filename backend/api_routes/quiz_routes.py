from flask import Blueprint

from controllers.quiz_controller import submit_quiz

quiz_bp = Blueprint(

    "quiz_bp",

    __name__

)

quiz_bp.route(

    "/submit",

    methods=["POST"]

)(submit_quiz)