import {inject, Injectable, signal} from '@angular/core';
import {tap} from 'rxjs';
import {Credentials} from '@domain/models/credentials.model';
import {AuthApiService} from '@infrastructure/api';
import {LocalStorageKeyEnum} from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly _authApi = inject(AuthApiService);

  login(credentials: Credentials) {
    this.loading.set(true);
    this.error.set(null);

    return this._authApi.login(credentials).pipe(
      tap({
        next: (res) => {
          localStorage.setItem(LocalStorageKeyEnum.ACCESS_TOKEN, res.token);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Login failed');
          this.loading.set(false);
        },
      }),
    );
  }
}
