from flask import Blueprint

from controllers.auth_controller import register_user, login_user

auth_bp = Blueprint('auth_bp', __name__)

# Register API
auth_bp.route('/register', methods=['POST'])(register_user)

# Login API
auth_bp.route('/login', methods=['POST'])(login_user)