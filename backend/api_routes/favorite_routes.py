from flask import Blueprint

from controllers.favorite_controller import (

    add_favorite,

    get_user_favorites,

    remove_favorite

)

favorite_bp = Blueprint(

    "favorite_bp",

    __name__

)

favorite_bp.post("")(add_favorite)

favorite_bp.get("/<int:user_id>")(get_user_favorites)

favorite_bp.delete("/<int:favorite_id>")(remove_favorite)