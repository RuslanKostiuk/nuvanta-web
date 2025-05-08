import {Routes} from '@angular/router';
import {LayoutComponent} from '@presentation/layout/layout.component';
import {authGuard, guestGuard} from '@shared/guards';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./presentation/login/login.component').then(m => m.LoginComponent),
  },
];
