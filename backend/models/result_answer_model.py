from extensions import db


class ResultAnswer(db.Model):

    __tablename__ = "result_answers"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    result_id = db.Column(
        db.Integer,
        db.ForeignKey("quiz_results.id"),
        nullable=False
    )

    question_id = db.Column(
        db.Integer,
        db.ForeignKey("questions.id"),
        nullable=False
    )

    selected_option_id = db.Column(
        db.Integer,
        db.ForeignKey("question_options.id"),
        nullable=False
    )

    is_correct = db.Column(
        db.Boolean,
        nullable=False
    )

    result = db.relationship(
        "QuizResult",
        backref="answers"
    )

    question = db.relationship("Question")

    selected_option = db.relationship("QuestionOption")