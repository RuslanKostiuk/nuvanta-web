import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LanguageSwitcherComponent} from '@presentation/ui-elements/language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
