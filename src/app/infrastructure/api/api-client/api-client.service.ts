import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments.dev';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  post<T = any, M = any>(url: string, body: M, options: any = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, options) as Observable<T>;
  }

  get<T = any, M = any>(url: string, queryStringParams?: M, options: any = {}): Observable<T> {
    if (queryStringParams) {
      let params = new HttpParams();
      Object.entries(queryStringParams).forEach(([key, value]) => {
        if (value !== undefined) {
          params = params.set(key, value as string | number | boolean);
        }
      });
      return this.http.get<T>(`${this.baseUrl}/${url}`, { params, ...options }) as Observable<T>;
    }

    return this.http.get<T>(`${this.baseUrl}/${url}`, options) as Observable<T>;
  }

  put<T = any, M = any>(url: string, body: M, options: any = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, options) as Observable<T>;
  }

  delete<T = any, M = any>(url: string, options: any = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, options) as Observable<T>;
  }
}
