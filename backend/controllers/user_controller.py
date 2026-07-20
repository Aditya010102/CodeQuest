from flask import request, jsonify
from models.user_model import User
from extensions import db
from flask_jwt_extended import get_jwt_identity


# ======================================
# GET USERS
# ======================================

def get_users():


    search = request.args.get("search", "").strip()

    role = request.args.get("role", "").strip()

    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("per_page", 10, type=int)

    query = User.query

    if search:

        query = query.filter(

            User.full_name.ilike(f"%{search}%") |

            User.email.ilike(f"%{search}%")

        )

    if role:

        query = query.filter(

            User.role == role

        )

    query = query.order_by(

        User.id.desc()

    )

    pagination = query.paginate(

        page=page,

        per_page=per_page,

        error_out=False

    )

    users = []

    for user in pagination.items:

        users.append({

            "id": user.id,

            "full_name": user.full_name,

            "email": user.email,

            "role": user.role,

            "is_active": user.is_active,

            "created_at": user.created_at.strftime("%d %b %Y")

        })

        total_users = User.query.count()

        total_admins = User.query.filter_by(
            role="admin"
        ).count()

        active_users = User.query.filter_by(
            is_active=True
        ).count()

        inactive_users = User.query.filter_by(
            is_active=False
        ).count()

        
    
    return jsonify({

    "users": users,

    "pagination": {

        "page": pagination.page,

        "per_page": pagination.per_page,

        "total": pagination.total,

        "total_pages": pagination.pages

    },

    "statistics": {

        "total_users": total_users,

        "total_admins": total_admins,

        "active_users": active_users,

        "inactive_users": inactive_users

    }

})

# ======================================
# UPDATE ROLE
# ======================================

def update_user_role(user_id):

    current_user_id = get_jwt_identity()

    if current_user_id == user_id:

        return jsonify({

        "message": "You cannot change your own role."

    }), 403

    user = User.query.get(user_id)

    if not user:

        return jsonify({

            "message": "User not found."

        }), 404

    data = request.get_json()

    role = data.get("role")

    if role not in ["admin", "user"]:

        return jsonify({

            "message": "Invalid role."

        }), 400

    user.role = role

    db.session.commit()

    return jsonify({

        "message": "User role updated successfully."

    })


# ======================================
# UPDATE STATUS
# ======================================

def update_user_status(user_id):

    current_user_id = get_jwt_identity()

    if current_user_id == user_id:

        return jsonify({

            "message": "You cannot deactivate your own account."

        }), 403

    user = User.query.get(user_id)

    if not user:

        return jsonify({

            "message": "User not found."

        }), 404

    data = request.get_json()

    user.is_active = bool(

        data.get("is_active")

    )

    db.session.commit()

    return jsonify({

        "message": "User status updated successfully."

    })