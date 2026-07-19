export interface QuestionOption {

    id?: number;

    text: string;

    is_correct: boolean;

}

export interface AdminQuestion {

    id: number;

    subject_id: number;

    subject_name: string;

    question_text: string;

    difficulty: string;

    marks: number;

    options: QuestionOption[];

}

export interface Pagination {

    page: number;

    per_page: number;

    total: number;

    total_pages: number;

}

export interface QuestionResponse {

    questions: AdminQuestion[];

    pagination: Pagination;

}