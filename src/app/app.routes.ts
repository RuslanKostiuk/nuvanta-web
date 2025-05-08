import {Routes} from '@angular/router';
import {LayoutComponent} from '@presentation/layout/layout.component';
import {authGuard, guestGuard} from '@shared/guards';
import {RouteEnum} from '@shared/enums';

export const routes: Routes = [
  {
    path: RouteEnum.LOGIN,
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./presentation/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      // {
      //   path: 'dashboard',
      //   loadComponent: () =>
      //     import('./presentation/dashboard/dashboard.component').then(m => m.DashboardComponent),
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
