export interface RecentAttempt {

    subject_name: string;

    score: number;

    percentage: number;

    date: string;

}

export interface DashboardData {

    total_quizzes: number;

    average_score: number;

    highest_score: number;

    recent_attempts: RecentAttempt[];

}