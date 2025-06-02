import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductImageApiService {
  private readonly _api = inject(ApiClientService);

  public getPresignedUrl(shopId: string, productId: string, params: {
    ext: string,
    contentType: string
  }[]): Observable<{
    key: string;
    uploadUrl: string
  }[]> {
    return this._api.post(`shops/${shopId}/products/${productId}/images/upload-url`, params);
  }

  public async uploadFiles(file: File, uploadUrl: string): Promise<void> {
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })
  }
}
