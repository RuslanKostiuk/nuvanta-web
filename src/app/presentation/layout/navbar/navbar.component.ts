import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouteEnum } from '@shared/enums';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ClickOutsideDirective } from '@shared/directives';

@Component({
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.scss'],
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    RouterLinkActive,
    TranslatePipe,
    RouterLink,
    ClickOutsideDirective,
  ],
})
export class NavbarComponent {
  readonly items = [
    { labelKey: 'Products', icon: 'box', route: '/' + RouteEnum.PRODUCTS },
    { labelKey: 'Orders', icon: 'creditCard', route: '/' + RouteEnum.ORDERS },
    {
      labelKey: 'Inventory Transactions',
      icon: 'rows4',
      route: '/' + RouteEnum.INVENTORY_TRANSACTIONS,
    },
    { labelKey: 'Stock Entries', icon: 'notebookPen', route: '/' + RouteEnum.STOCK_ENTRIES },
  ];

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update((x) => !x);
  }
}
