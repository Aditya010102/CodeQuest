export interface QuestionOption {

    id: number;

    text: string;

    is_correct: boolean;

}

export interface Question {

    id: number;

    subject_id: number;

    question_text: string;

    difficulty: string;

    marks: number;

    options: QuestionOption[];

}