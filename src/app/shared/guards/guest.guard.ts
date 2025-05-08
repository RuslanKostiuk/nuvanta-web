import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LocalStorageKeyEnum} from '@shared/enums';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);

  if (token) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
