import { Route } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';

export const AdminRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/all-products/all-products.component').then(
            (m) => m.AllProductsComponent
          ),
      },
    ],
  },
];
