import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LanguageSwitcherComponent} from '@presentation/ui-elements/language-switcher/language-switcher.component';
import {LoginService} from '@application/services';
import {Router} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LanguageSwitcherComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _login = inject(LoginService);
  private readonly _router = inject(Router);

  logout() {
    this._login.logout();
  }
}
