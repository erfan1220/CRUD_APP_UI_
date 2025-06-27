import { Route } from "@angular/router";
import { LayoutComponent } from "./shared/layout/layout.component";

export const AuthRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)

            },
            {
                path: 'verify',
                loadComponent: () => import('./components/verify/verify.component').then(c => c.VerifyComponent)
            },
            {
                path: 'verify2',
                loadComponent: () => import('./components/verify2/verify2.component').then(c=> c.Verify2Component)
            },
            {
                path: '**',
                redirectTo: 'login',
            },
        ]
    }
]