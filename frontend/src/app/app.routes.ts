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
                path: 'result',
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

    // {
    //     path: 'admin',
    //     component: AdminLayoutComponent,
    //     canActivate: [authGuard, adminGuard],
    //     children: [

    //         {
    //             path: '',
    //             component: AdminDashboardComponent
    //         },

    //         // Next Sprint
    //         {
    //             path: 'subjects',
    //             component: AdminSubjectsComponent
    //         },
    //         //
    //         {
    //             path: 'questions',
    //             component: AdminQuestionsComponent
    //         },
    //         //
    //         // {
    //         //   path:'users',
    //         //   component:UsersComponent
    //         // },
    //         //
    //         // {
    //         //   path:'results',
    //         //   component:ResultsComponent
    //         // }

    //     ]
    // },

    // {
    //     path: '**',
    //     redirectTo: ''
    // }

];