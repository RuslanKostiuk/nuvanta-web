import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageKeyEnum} from '@shared/enums';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem(LocalStorageKeyEnum.ACCESS_TOKEN);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
