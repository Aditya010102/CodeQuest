export interface HistorySubject {

    id: number;

    name: string;

}

export interface QuizHistory {

    id: number;

    subject: HistorySubject;

    score: number;

    percentage: number;

    correct_answers: number;

    wrong_answers: number;

    attempted_questions: number;

    created_at: string;

}