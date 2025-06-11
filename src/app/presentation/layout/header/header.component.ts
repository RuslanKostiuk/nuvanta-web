import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LoginService} from '@application/services';
import {LucideAngularModule} from 'lucide-angular';
import {TranslatePipe} from '@ngx-translate/core';
import {NavbarComponent} from '@presentation/layout/navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, TranslatePipe, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _login = inject(LoginService);

  logout() {
    this._login.logout();
  }
}
