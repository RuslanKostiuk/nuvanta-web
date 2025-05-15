import {Component, Input} from '@angular/core';
import {FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-images',
  imports: [ReactiveFormsModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss'
})
export class ProductImagesComponent {
  @Input({required: true}) formArray!: FormArray;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.readFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) this.readFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeImage(index: number) {
    debugger;
    this.formArray.removeAt(index);
  }

  private readFile(file: File) {
    if (this.formArray.length >= 3) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.formArray.push(new FormControl(url));
    };
    reader.readAsDataURL(file);
  }
}
