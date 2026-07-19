from flask import jsonify
from sqlalchemy import desc

from models.result_model import QuizResult
from models.user_model import User
from models.subject_model import Subject


def leaderboard():

    results = QuizResult.query.order_by(

        desc(QuizResult.percentage)

    ).limit(20).all()

    response = []

    for result in results:

        response.append({

            "user":{

                "id":result.user.id,

                "name":result.user.full_name

            },

            "subject":{

                "id":result.subject.id,

                "name":result.subject.name

            },

            "score":result.score,

            "percentage":result.percentage

        })

    return jsonify(response)