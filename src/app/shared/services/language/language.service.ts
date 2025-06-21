import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum, LocalStorageKeyEnum } from '@shared/enums';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _translate = inject(TranslateService);

  private readonly _lang = signal<LanguageEnum>(LanguageEnum.EN);
  readonly lang = this._lang.asReadonly();

  constructor() {
    // this._translate.addLangs([LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL]);
    this._translate.setDefaultLang(LanguageEnum.EN);
    // this._translate.use(this._lang());
    this.setHtmlLang(this._lang());
  }

  change(lang: LanguageEnum) {
    this._lang.set(lang);
    this._translate.use(lang);
    this.setHtmlLang(lang);
    localStorage.setItem(LocalStorageKeyEnum.Language, lang);
  }

  private initLanguage(): LanguageEnum {
    const saved = localStorage.getItem(LocalStorageKeyEnum.Language) as LanguageEnum;
    if (saved && [LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL].includes(saved)) {
      return saved as LanguageEnum;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('uk')) return LanguageEnum.UA;
    if (browserLang.startsWith('pl')) return LanguageEnum.PL;
    if (browserLang.startsWith('en')) return LanguageEnum.EN;

    return LanguageEnum.EN;
  }

  private setHtmlLang(lang: LanguageEnum) {
    document.documentElement.lang = lang;
  }
}
