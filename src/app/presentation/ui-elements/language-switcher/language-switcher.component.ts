import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {LanguageEnum} from '@shared/enums';
import {LanguageService} from '@shared/services';
import {ClickOutsideDirective} from '@shared/directives';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ClickOutsideDirective
  ]
})
export class LanguageSwitcherComponent {
  readonly langs: LanguageEnum[] = [LanguageEnum.UA, LanguageEnum.EN, LanguageEnum.PL];
  dropdownOpen = signal(false);
  private readonly _langService = inject(LanguageService);
  readonly currentLang = this._langService.lang;

  toggleDropdown() {
    this.dropdownOpen.update((x) => !x)
  }

  switchTo(lang: LanguageEnum) {
    this.dropdownOpen.set(false);
    this._langService.change(lang);
  }
}
