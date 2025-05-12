import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageEnum } from '@shared/enums';
import { LanguageService } from '@shared/services';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  readonly langs: LanguageEnum[] = [LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL];
  private readonly _langService = inject(LanguageService);
  readonly currentLang = this._langService.lang;

  switchTo(lang: LanguageEnum) {
    this._langService.change(lang);
  }
}
