from extensions import db


class FavoriteQuestion(db.Model):

    __tablename__ = "favorite_questions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    question_id = db.Column(
        db.Integer,
        db.ForeignKey("questions.id"),
        nullable=False
    )

    is_deleted = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    # Relationships

    user = db.relationship(
        "User",
        backref="favorite_questions"
    )

    question = db.relationship(
        "Question",
        backref="favorite_questions"
    )