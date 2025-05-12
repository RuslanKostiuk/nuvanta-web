import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '@domain/models/credentials.model';
import { ApiClientService } from '@infrastructure/api';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private _api = inject(ApiClientService);

  login(credentials: Credentials): Observable<{ token: string }> {
    return this._api.post<{ token: string }, Credentials>('auth/login', credentials);
  }
}
