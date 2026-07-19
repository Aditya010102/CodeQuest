from flask import Blueprint

from controllers.profile_controller import (

    change_password,
    get_profile,

    update_profile

)

profile_bp = Blueprint(

"profile_bp",

__name__

)

profile_bp.route(

"/<int:user_id>",

methods=["GET"]

)(get_profile)

profile_bp.route(

"/<int:user_id>",

methods=["PUT"]

)(update_profile)

profile_bp.route(

    "/change-password/<int:user_id>",

    methods=["PUT"]

)(change_password)