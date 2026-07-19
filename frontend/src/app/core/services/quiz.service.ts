import { Injectable } from '@angular/core';

import { QuizResult } from '../../shared/interfaces/result.interface';

@Injectable({

  providedIn: 'root'

})

export class QuizService {

  calculateResult(

    questions: any[],

    answers: number[]

  ): QuizResult {

    let correct = 0;

    let attempted = 0;

    questions.forEach(

      (question, index) => {

        if (

          answers[index] != null

        ) {

          attempted++;

          const correctOption =

            question.options.find(

              (option: any) =>

                option.is_correct

            );

          if (

            correctOption &&

            correctOption.id == answers[index]

          ) {

            correct++;

          }

        }

      }

    );

    const wrong =

      attempted - correct;

    const percentage =

      questions.length === 0

        ? 0

        : (correct / questions.length) * 100;

    return {

      totalQuestions:

        questions.length,

      attemptedQuestions:

        attempted,

      correctAnswers:

        correct,

      wrongAnswers:

        wrong,

      score:

        correct,

      percentage:

        Math.round(percentage)

    };

  }

}