import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SessionService, ShopService } from '@application/services';
import { Shop } from '@domain/models';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '@shared/directives';

@Component({
  selector: 'app-shop-switcher',
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './shop-switcher.component.html',
  styleUrl: './shop-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSwitcherComponent {
  public isOpen = signal(false);
  private readonly _shopService = inject(ShopService);
  readonly shops = this._shopService.shops;
  private readonly _session = inject(SessionService);
  readonly activeShop = this._session.activeShop;

  toggle(): void {
    this.isOpen.update((x) => !x);
  }

  select(shop: Shop) {
    this._session.setShop(shop);
  }

  isSelected(shop: Shop): boolean {
    return this.activeShop()?.id === shop.id;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
