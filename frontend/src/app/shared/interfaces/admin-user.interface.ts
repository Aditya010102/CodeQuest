export interface AdminUser {

    id: number;

    full_name: string;

    email: string;

    role: string;

    is_active: boolean;

    created_at: string;

}

export interface Pagination {

    page: number;

    per_page: number;

    total: number;

    total_pages: number;

}

export interface UserStatistics {

    total_users: number;

    total_admins: number;

    active_users: number;

    inactive_users: number;

}

export interface UserResponse {

    users: AdminUser[];

    pagination: Pagination;

    statistics: UserStatistics;

}