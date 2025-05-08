import {Routes} from '@angular/router';
import {LayoutComponent} from '@presentation/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./presentation/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ]
  }
];
