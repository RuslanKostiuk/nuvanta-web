import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouteEnum} from '@shared/enums';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.scss'],
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, RouterLinkActive, TranslatePipe, RouterLink],
})
export class NavbarComponent {
  readonly items = [
    {labelKey: 'Products', icon: 'box', route: '/' + RouteEnum.PRODUCTS},
    {labelKey: 'Orders', icon: 'creditCard', route: '/' + RouteEnum.ORDERS},
    {labelKey: 'Stock Entries', icon: 'package', route: '/' + RouteEnum.STOCK_ENTRIES},
  ];

}
