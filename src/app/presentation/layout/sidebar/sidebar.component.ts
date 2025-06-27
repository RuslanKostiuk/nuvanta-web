import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouteEnum } from '@shared/enums';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ClickOutsideDirective } from '@shared/directives';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
    TranslatePipe,
    ClickOutsideDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly items = [
    { labelKey: 'SIDEBAR.DASHBOARD', icon: 'layout-dashboard', route: '/' + RouteEnum.DASHBOARD },
    { labelKey: 'SIDEBAR.PRODUCTS', icon: 'package', route: '/' + RouteEnum.PRODUCTS },
    { labelKey: 'SIDEBAR.CATEGORIES', icon: 'folders', route: '/' + RouteEnum.CATEGORIES },
    {
      labelKey: 'SIDEBAR.inventory_transactions',
      icon: 'file-text',
      route: '/' + RouteEnum.INVENTORY_TRANSACTIONS,
    },
    { labelKey: 'SIDEBAR.ORDERS', icon: 'receipt', route: '/' + RouteEnum.ORDERS },
    { labelKey: 'SIDEBAR.USERS', icon: 'users', route: '/' + RouteEnum.USERS },
  ];

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((x) => !x);
  }
}
