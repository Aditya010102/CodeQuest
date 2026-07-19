from extensions import db

class QuestionOption(db.Model):
    __tablename__ = "question_options"

    id = db.Column(db.Integer, primary_key=True)

    question_id = db.Column(
        db.Integer,
        db.ForeignKey("questions.id"),
        nullable=False
    )

    option_text = db.Column(
        db.String(255),
        nullable=False
    )

    is_correct = db.Column(
        db.Boolean,
        default=False
    )