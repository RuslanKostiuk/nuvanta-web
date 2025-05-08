import {Component} from '@angular/core';
import {LoginComponent} from '@presentation/login/login.component';
import {HeaderComponent} from '@presentation/header/header.component';
import {FooterComponent} from '@presentation/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nuvanta-web';
}
