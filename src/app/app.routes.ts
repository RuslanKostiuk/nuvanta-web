import {Routes} from '@angular/router';
import {LayoutComponent} from '@presentation/layout/layout.component';
import {authGuard, guestGuard} from '@shared/guards';
import {RouteEnum} from '@shared/enums';
import {shopSessionResolver} from '@application/resolvers';

export const routes: Routes = [
  {
    path: RouteEnum.LOGIN,
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./presentation/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    resolve: {
      shop: shopSessionResolver,
    },
    children: [
      {
        path: RouteEnum.DASHBOARD,
        loadComponent: () =>
          import('./presentation/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./presentation/product-list/product-list.component').then(m => m.ProductListComponent),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('@presentation/invoice-grid/invoice-grid.component').then(m => m.InvoiceGridComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RouteEnum.PRODUCTS,
      },
      {
        path: '**',
        redirectTo: RouteEnum.PRODUCTS,
      },
    ],
  },
];
