export interface RecentUser {

    id: number;

    full_name: string;

    email: string;

    role: string;

}

export interface RecentResult {

    user: string;

    subject: string;

    score: number;

    percentage: number;

    date: string;

}

export interface AdminDashboard {

    total_users: number;

    total_subjects: number;

    total_questions: number;

    total_attempts: number;

    recent_users: RecentUser[];

    recent_results: RecentResult[];

}