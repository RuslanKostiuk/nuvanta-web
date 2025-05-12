import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageKeyEnum, RouteEnum } from '@shared/enums';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);

  if (!token) {
    router.navigateByUrl('/' + RouteEnum.LOGIN);
    return false;
  }

  return true;
};
