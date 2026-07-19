export interface Favorite {

    id: number;

    question_id: number;

    question: string;

    difficulty: string;

    marks: number;

    subject: {

        id: number;

        name: string;

    };

    created_at: string;

}