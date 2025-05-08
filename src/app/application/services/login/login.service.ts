import {inject, Injectable, signal} from '@angular/core';
import {tap} from 'rxjs';
import {Credentials} from '@domain/models/credentials.model';
import {AuthApiService} from '@infrastructure/api';
import {LocalStorageKeyEnum, RouteEnum} from '@shared/enums';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly _authApi = inject(AuthApiService);
  private readonly _router = inject(Router);

  login(credentials: Credentials) {
    this.loading.set(true);
    this.error.set(null);

    return this._authApi.login(credentials).pipe(
      tap({
        next: (res) => {
          localStorage.setItem(LocalStorageKeyEnum.ACCESS_TOKEN, res.token);
          this._router.navigateByUrl('/' + RouteEnum.DASHBOARD);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Login failed');
          this.loading.set(false);
        },
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(LocalStorageKeyEnum.ACCESS_TOKEN);
    this._router.navigateByUrl('/' + RouteEnum.LOGIN);
  }
}
