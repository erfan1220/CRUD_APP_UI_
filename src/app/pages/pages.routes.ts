import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const PagesRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./main-page/main-page.component').then(
            (m) => m.MainPageComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then((r) => r.AuthRoutes),
  },
];
