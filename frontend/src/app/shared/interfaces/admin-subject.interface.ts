export interface AdminSubject {

    id: number;

    name: string;

    description: string;

    total_questions: number;

}

export interface Pagination {

    page: number;

    per_page: number;

    total: number;

    total_pages: number;

}

export interface SubjectResponse {

    subjects: AdminSubject[];

    pagination: Pagination;

}