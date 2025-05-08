import {Component} from '@angular/core';
import {LayoutComponent} from '@presentation/layout/layout.component';
import {HeaderComponent} from '@presentation/layout/header/header.component';
import {FooterComponent} from '@presentation/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
