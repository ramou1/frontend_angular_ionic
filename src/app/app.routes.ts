import { Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes.const';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.DASHBOARD,
        component: DashboardComponent
    },
    {
        path: APP_ROUTES.TASKS,
        component: TasksComponent
    },
    {
        path: APP_ROUTES.USERS,
        component: UsersComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    }
];
