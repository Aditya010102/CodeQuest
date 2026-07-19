from extensions import db
from datetime import datetime

class Subject(db.Model):

    __tablename__ = "subjects"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    description = db.Column(db.Text)

    total_questions = db.Column(
        db.Integer,
        default=0
    )

    is_deleted = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )