import {Component, output} from '@angular/core';
import {ModalComponent} from '@presentation/modals/modal/modal.component';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrl: './product-add-modal.component.scss',
  imports: [
    ModalComponent
  ]
})
export class ProductAddModalComponent {
  readonly close = output();

  onSubmit(): void {
    console.log('submit');
  }
}
