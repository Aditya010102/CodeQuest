from flask import request, jsonify
from models.question_model import Question


def submit_quiz():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "message": "Invalid JSON request."
        }), 400

    answers = data.get("answers", [])

    if not answers:
        return jsonify({
            "message": "No answers submitted."
        }), 400

    total_questions = len(answers)

    correct_answers = 0
    wrong_answers = 0
    score = 0

    review = []

    for answer in answers:

        question_id = answer.get("question_id")
        selected_option_id = answer.get("selected_option_id")

        question = Question.query.filter_by(
            id=question_id
        ).first()

        if not question:
            continue

        correct_option = None

        for option in question.options:

            if option.is_correct:
                correct_option = option
                break

        selected_option = None

        for option in question.options:

            if option.id == selected_option_id:
                selected_option = option
                break

        is_correct = (
            correct_option is not None and
            correct_option.id == selected_option_id
        )

        if is_correct:

            correct_answers += 1
            score += question.marks

        else:

            wrong_answers += 1

        review.append({

            "question_id": question.id,

            "question": question.question_text,

            "difficulty": question.difficulty,

            "marks": question.marks,

            "selected_option_id": selected_option_id,

            "selected_option": (
                selected_option.option_text
                if selected_option
                else None
            ),

            "correct_option_id": (
                correct_option.id
                if correct_option
                else None
            ),

            "correct_option": (
                correct_option.option_text
                if correct_option
                else None
            ),

            "is_correct": is_correct

        })

    percentage = round(
        (correct_answers / total_questions) * 100,
        2
    ) if total_questions else 0

    result = (
        "Pass"
        if percentage >= 40
        else "Fail"
    )

    return jsonify({

        "score": score,

        "total_questions": total_questions,

        "correct_answers": correct_answers,

        "wrong_answers": wrong_answers,

        "percentage": percentage,

        "result": result,

        "review": review

    })