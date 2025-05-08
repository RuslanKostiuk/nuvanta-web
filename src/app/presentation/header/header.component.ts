import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LanguageService} from '@shared/services';
import {LanguageEnum} from '@shared/enums';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly langs: LanguageEnum[] = [LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL];
  private readonly _langService = inject(LanguageService);
  readonly currentLang = this._langService.lang;

  switchTo(lang: LanguageEnum) {
    this._langService.change(lang);
  }
}
