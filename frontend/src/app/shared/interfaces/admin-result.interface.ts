export interface AdminResult {

    id: number;

    user_id: number;

    user_name: string;

    subject_id: number;

    subject_name: string;

    score: number;

    percentage: number;

    correct_answers: number;

    wrong_answers: number;

    attempted_questions: number;

    total_questions: number;

    created_at: string;

}

export interface Pagination {

    page: number;

    per_page: number;

    total: number;

    total_pages: number;

}

export interface ResultStatistics {

    total_results: number;

    average_percentage: number;

}

export interface ResultResponse {

    results: AdminResult[];

    pagination: Pagination;

    statistics: ResultStatistics;

}

export interface ResultAnswer {

    question: string;

    selected_answer: string;

    correct_answer: string;

    is_correct: boolean;

}

export interface ResultDetail {

    id: number;

    user: string;

    email: string;

    subject: string;

    score: number;

    percentage: number;

    correct_answers: number;

    wrong_answers: number;

    attempted_questions: number;

    total_questions: number;

    created_at: string;

}

export interface ResultDetailResponse {

    result: ResultDetail;

    answers: ResultAnswer[];

}