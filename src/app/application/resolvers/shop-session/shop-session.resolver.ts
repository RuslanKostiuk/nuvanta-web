import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SessionService } from '@application/services';
import { map } from 'rxjs';

export const shopSessionResolver: ResolveFn<true> = () => {
  const session = inject(SessionService);
  return session.loadAndSelectShop().pipe(map(() => true));
};
