import { Route } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./admin-page/admin-page.component').then(
            (m) => m.AdminPageComponent
          ),
      },
    ],
  },
];
