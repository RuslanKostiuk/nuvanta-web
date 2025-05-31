import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {LocalStorageKeyEnum} from '@shared/enums';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);

  const authReq = token
    ? req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        localStorage.removeItem(LocalStorageKeyEnum.ACCESS_TOKEN);
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
