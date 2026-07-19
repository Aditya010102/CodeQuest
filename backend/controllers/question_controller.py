from flask import jsonify

from models.question_model import Question

from flask import request

from extensions import db

from models.question_option_model import QuestionOption


# def get_questions(subject_id):

#     questions = Question.query.filter_by(
#         subject_id=subject_id
#     ).all()

#     response = []

#     for question in questions:

#         options = []

#         for option in question.options:

#             options.append({

#                 "id": option.id,

#                 "text": option.option_text,
#                 "is_correct":option.is_correct

#             })

#         response.append({

#             "id": question.id,

#             "question": question.question_text,

#             "difficulty": question.difficulty,

#             "marks": question.marks,

#             "options": options

#         })

#     return jsonify(response)



def get_questions():

    questions = Question.query.filter_by(

        is_deleted=False

    ).all()

    response = []

    for question in questions:

        response.append({

            "id":question.id,

            "subject_id":question.subject_id,

            "question_text":question.question_text,

            "difficulty":question.difficulty,

            "marks":question.marks,

            "options":[

                {

                    "id":option.id,

                    "text":option.option_text,

                    "is_correct":option.is_correct

                }

                for option in question.options

            ]

        })

    return jsonify(response)

def get_questions_by_subject(subject_id):

    questions = Question.query.filter_by(
        subject_id=subject_id,
        is_deleted=False
    ).all()

    response = []

    for question in questions:

        response.append({

            "id": question.id,

            "subject_id": question.subject_id,

            "question_text": question.question_text,

            "difficulty": question.difficulty,

            "marks": question.marks,

            "options": [

                {
                    "id": option.id,
                    "text": option.option_text,
                    "is_correct": option.is_correct
                }

                for option in question.options

            ]

        })

    return jsonify(response)


def create_question():

    data = request.get_json()

    question = Question(

        subject_id=data["subject_id"],

        question_text=data["question_text"],

        difficulty=data["difficulty"],

        marks=data["marks"]

    )

    db.session.add(question)

    db.session.flush()

    for option in data["options"]:

        db.session.add(

            QuestionOption(

                question_id=question.id,

                option_text=option["text"],

                is_correct=option["is_correct"]

            )

        )

    db.session.commit()

    return jsonify({

        "message":"Question Created"

    })

def update_question(question_id):

    data = request.get_json()

    question = Question.query.get_or_404(question_id)

    question.subject_id = data["subject_id"]

    question.question_text = data["question_text"]

    question.difficulty = data["difficulty"]

    question.marks = data["marks"]

    QuestionOption.query.filter_by(

        question_id=question.id

    ).delete()

    for option in data["options"]:

        db.session.add(

            QuestionOption(

                question_id=question.id,

                option_text=option["text"],

                is_correct=option["is_correct"]

            )

        )

    db.session.commit()

    return jsonify({

        "message":"Question Updated"

    })

def delete_question(question_id):

    question = Question.query.get_or_404(question_id)

    question.is_deleted = True

    db.session.commit()

    return jsonify({

        "message":"Question Deleted"

    })