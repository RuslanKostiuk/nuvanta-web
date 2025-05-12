import { inject, Injectable, signal } from '@angular/core';
import { Shop, User } from '@domain/models';
import { ShopService } from '@application/services';
import { map } from 'rxjs';
import { LocalStorageKeyEnum } from '@shared/enums';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly _shopService = inject(ShopService);

  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  private readonly _activeShop = signal<Shop | null>(null);
  readonly activeShop = this._activeShop.asReadonly();

  setUser(user: User) {
    this._user.set(user);
  }

  setShop(shop: Shop) {
    this._activeShop.set(shop);
    localStorage.setItem(LocalStorageKeyEnum.ACTIVE_SHOP_ID, shop.id);
  }

  clearSession() {
    this._user.set(null);
    this._activeShop.set(null);
    localStorage.removeItem(LocalStorageKeyEnum.ACTIVE_SHOP_ID);
  }

  loadAndSelectShop() {
    return this._shopService.fetchShops().pipe(
      map((shops) => {
        const savedId = localStorage.getItem(LocalStorageKeyEnum.ACTIVE_SHOP_ID);
        const matched = savedId ? shops.find((s) => s.id === savedId) : null;

        const selected = matched ?? shops[0] ?? null;
        if (selected) this.setShop(selected);

        return selected;
      }),
    );
  }
}
