import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layouts/main-layout/main-layout';

import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

import { DashboardComponent } from './features/dashboard/dashboard';
import { QuizComponent } from './features/quiz/quiz';
import { ResultComponent } from './features/result/result';
import { ProfileComponent } from './features/profile/profile';
import { HistoryComponent } from './features/history/history';
import { LeaderboardComponent } from './features/leaderboard/leaderboard';


import { authGuard } from './core/guards/auth-guard';
import { SubjectsComponent } from './features/subjects/subjects';
import { FavoritesComponent } from './features/favorites/favorites';
import { SettingsComponent } from './features/settings/settings';
import { ChangePasswordComponent } from './features/change-password/change-password';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout';
import { adminGuard } from './core/guards/admin-guard';
import { AdminResultsComponent } from './features/admin/results/results';
import { AdminUsersComponent } from './features/admin/users/users';
import { AdminQuestionsComponent } from './features/admin/questions/questions';
import { AdminSubjectsComponent } from './features/admin/subjects/subjects';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },

    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [

            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'subjects',
                component: SubjectsComponent
            },
            {
                path: 'quiz/:subjectId',
                component: QuizComponent
            },
            {
                path: 'favorites',
                component: FavoritesComponent
            },
            {
                path: 'result/:id',
                component: ResultComponent
            },

            {
                path: 'profile',
                component: ProfileComponent
            },

            {
                path: 'history',
                component: HistoryComponent
            },

            {
                path: 'leaderboard',
                component: LeaderboardComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            }

        ]
    },

    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [authGuard, adminGuard],
        children: [

            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },

            {
                path: 'subjects',
                component: AdminSubjectsComponent
            },

            {
                path: 'questions',
                component: AdminQuestionsComponent
            },

            {
                path: 'users',
                component: AdminUsersComponent
            },

            {
                path: 'results',
                component: AdminResultsComponent
            }

        ]
    }

];