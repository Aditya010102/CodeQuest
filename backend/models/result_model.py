from extensions import db


class QuizResult(db.Model):

    __tablename__ = "quiz_results"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    subject_id = db.Column(
        db.Integer,
        db.ForeignKey("subjects.id"),
        nullable=False
    )

    total_questions = db.Column(
        db.Integer,
        nullable=False
    )

    attempted_questions = db.Column(
        db.Integer,
        nullable=False
    )

    correct_answers = db.Column(
        db.Integer,
        nullable=False
    )

    wrong_answers = db.Column(
        db.Integer,
        nullable=False
    )

    score = db.Column(
        db.Integer,
        nullable=False
    )

    percentage = db.Column(
        db.Float,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    # Relationships

    user = db.relationship(
        "User",
        backref="quiz_results"
    )

    subject = db.relationship(
        "Subject",
        backref="quiz_results"
    )