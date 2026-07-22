from flask import Blueprint
from flask_jwt_extended import jwt_required

from controllers.favorite_controller import (
    add_favorite,
    get_user_favorites,
    remove_favorite
)

favorite_bp = Blueprint(
    "favorite_bp",
    __name__
)

favorite_bp.post("")(
    jwt_required()(add_favorite)
)

favorite_bp.get("")(
    jwt_required()(get_user_favorites)
)

favorite_bp.delete("/<int:favorite_id>")(
    jwt_required()(remove_favorite)
)