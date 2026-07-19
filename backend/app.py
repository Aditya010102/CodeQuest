from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from extensions import db
from config import Config

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)

jwt = JWTManager(app)

# Import Routes
from api_routes.auth_routes import auth_bp
from api_routes.subject_routes import subject_bp
from api_routes.question_routes import question_bp
from api_routes.quiz_routes import quiz_bp
from api_routes.result_routes import result_bp
from api_routes.dashboard_routes import dashboard_bp
from api_routes.profile_routes import profile_bp
from api_routes.leaderboard_routes import leaderboard_bp
from api_routes.favorite_routes import favorite_bp
from api_routes.admin_dashboard_routes import admin_dashboard_bp

# Register Blueprint
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(
    subject_bp,
    url_prefix="/api/subjects/"
)
app.register_blueprint(
    question_bp,
    url_prefix="/api/questions"
)
app.register_blueprint(

    quiz_bp,

    url_prefix="/api/quiz"

)
app.register_blueprint(

    result_bp,

    url_prefix="/api/results"

)
app.register_blueprint(

    dashboard_bp,

    url_prefix="/api/dashboard"

)
app.register_blueprint(

    profile_bp,

    url_prefix="/api/profile"

)
app.register_blueprint(

    leaderboard_bp,

    url_prefix="/api/leaderboard"

)
app.register_blueprint(

    admin_dashboard_bp,

    url_prefix="/api/admin/dashboard"

)
app.register_blueprint(

    favorite_bp,

    url_prefix="/api/favorites"

)
@app.route('/')
def home():
    return {
        "message": "CodeQuest API Running"
    }

if __name__ == '__main__':

    with app.app_context():
        from models.user_model import User
        from models.subject_model import Subject
        from models.question_model import Question
        from models.question_option_model import QuestionOption
        from models.result_model import QuizResult
        from models.favorite_model import FavoriteQuestion
       

        db.create_all()

    app.run(debug=True)