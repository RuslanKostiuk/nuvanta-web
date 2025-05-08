import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LocalStorageKeyEnum} from '@shared/enums';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
