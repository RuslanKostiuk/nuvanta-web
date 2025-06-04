import {inject, Injectable} from '@angular/core';
import {ApiClientService} from '@infrastructure/api';
import {Observable} from 'rxjs';
import {GetUploadUrlDto} from '@infrastructure/api/product-image/dto';
import {UploadUrlResponse} from '@infrastructure/api/product-image/dto/upload-url.response';

@Injectable({providedIn: 'root'})
export class ProductImageApiService {
  private readonly _api = inject(ApiClientService);

  public getPresignedUrl(shopId: string, productId: string, params: GetUploadUrlDto[]): Observable<UploadUrlResponse[]> {
    return this._api.post(`shops/${shopId}/products/${productId}/images/upload-url`, params);
  }

  public async uploadFiles(file: File, uploadUrl?: string): Promise<void> {
    if (!uploadUrl) {
      return;
    }

    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })
  }
}
