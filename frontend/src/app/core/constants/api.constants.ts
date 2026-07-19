import {

    environment

}

    from "../../../environments/environment";

export const API = {

    BASE_URL: environment.apiUrl,

    AUTH: "/auth",

    SUBJECTS: "/subjects/",

    QUESTIONS: "/questions",

    RESULTS: "/results",

    FAVORITES: "/favorites",

    LEADERBOARD: "/leaderboard",

    PROFILE: '/profile',

    CHANGE_PASSWORD: "/profile/change-password",

    // Admin routes

    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_SUBJECTS: "/subjects/",

}