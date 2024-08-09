import { Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes.const';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.DASHBOARD,
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    }
];
