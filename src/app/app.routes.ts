import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./auth/auth.routes').then(r => r.AuthRoutes)
    // },
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then(r => r.PagesRoutes)
    }

];
