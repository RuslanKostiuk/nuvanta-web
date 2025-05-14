import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from '@domain/models';

@Component({
  selector: 'app-product-row',
  imports: [],
  templateUrl: './product-row.component.html',
  styleUrl: './product-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  @Input() product!: Product;

  onEdit() {
    // TODO: open modal or emit event
    console.log('Product Edit');
  }
}
