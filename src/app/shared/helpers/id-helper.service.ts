import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class IdHelperService {
  public generateTempId(): string {
    return 'temp_' + Math.random().toString(36).slice(2);
  }

  public generateId(): string {
    return uuidv4();
  }
}
