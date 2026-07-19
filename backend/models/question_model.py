from extensions import db

class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)

    subject_id = db.Column(
        db.Integer,
        db.ForeignKey("subjects.id"),
        nullable=False
    )

    question_text = db.Column(db.Text, nullable=False)

    difficulty = db.Column(
        db.String(20),
        default="Easy"
    )

    marks = db.Column(
        db.Integer,
        default=1
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    is_deleted = db.Column(
    db.Boolean,
    default=False
    )

    options = db.relationship(
        "QuestionOption",
        backref="question",
        lazy=True,
        cascade="all, delete-orphan"
    )
    subject = db.relationship(

    "Subject",

    backref="questions"

)