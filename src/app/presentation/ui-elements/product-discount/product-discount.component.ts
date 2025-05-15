import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-discount',
  imports: [ReactiveFormsModule],
  templateUrl: './product-discount.component.html',
  styleUrl: './product-discount.component.scss'
})
export class ProductDiscountComponent {
  @Input({required: true}) formGroup!: FormGroup;
}
