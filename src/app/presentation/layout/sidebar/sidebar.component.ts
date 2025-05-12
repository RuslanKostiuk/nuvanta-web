import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouteEnum} from '@shared/enums';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly items = [
    {label: 'Dashboard', icon: 'layout-dashboard', route: '/' + RouteEnum.DASHBOARD},
    {label: 'Products', icon: 'package', route: '/' + RouteEnum.PRODUCTS},
    {label: 'Categories', icon: 'folders', route: '/' + RouteEnum.CATEGORIES},
    {label: 'Invoices', icon: 'file-text', route: '/' + RouteEnum.INVOICES},
    {label: 'Orders', icon: 'receipt', route: '/' + RouteEnum.ORDERS},
    {label: 'Users', icon: 'users', route: '/' + RouteEnum.USERS},
  ];
}
