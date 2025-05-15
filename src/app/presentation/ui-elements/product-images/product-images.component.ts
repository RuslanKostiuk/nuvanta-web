import {ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-product-images',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss'
})
export class ProductImagesComponent {
  @Input({required: true}) formArray!: FormArray;
  @ViewChild('previewListRef') previewListRef!: ElementRef<HTMLDivElement>;

  isDragging = false;
  private _cdr = inject(ChangeDetectorRef);

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.readFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (file) this.readFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }


  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  removeImage(index: number) {
    this.formArray.removeAt(index);
    setTimeout(() => {
      this.previewListRef?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
  }

  private readFile(file: File) {
    if (this.formArray.length >= 3) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.formArray.push(new FormControl(url));
      this._cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }
}
