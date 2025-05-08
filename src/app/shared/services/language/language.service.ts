import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum, LocalStorageKeyEnum} from '@shared/enums';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly _translate = inject(TranslateService);

  private readonly _lang = signal<LanguageEnum>(
    (localStorage.getItem(LocalStorageKeyEnum.Language) as LanguageEnum) || LanguageEnum.UA,
  );

  readonly lang = this._lang.asReadonly();

  constructor() {
    this._translate.addLangs([LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL]);
    this._translate.setDefaultLang(LanguageEnum.UA);
    this._translate.use(this._lang());
  }

  change(lang: LanguageEnum) {
    this._lang.set(lang);
    this._translate.use(lang);
    localStorage.setItem(LocalStorageKeyEnum.Language, lang);
  }
}
