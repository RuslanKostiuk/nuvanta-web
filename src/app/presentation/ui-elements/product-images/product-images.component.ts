import {ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {IdHelperService} from '@shared/helpers/id-helper.service';

@Component({
  standalone: true,
  selector: 'app-product-images',
  imports: [ReactiveFormsModule, NgClass, DragDropModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss'
})
export class ProductImagesComponent {
  @Input({required: true}) formArray!: FormArray;
  @ViewChild('previewListRef') previewListRef!: ElementRef<HTMLDivElement>;

  isDragging = false;
  private _cdr = inject(ChangeDetectorRef);
  private _idHelper = inject(IdHelperService);

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

  onReorder(event: CdkDragDrop<FormControl[]>) {
    const controls = this.formArray.controls;
    moveItemInArray(controls, event.previousIndex, event.currentIndex);

    const newArray = new FormArray<FormControl>([]);
    controls.forEach(c => newArray.push(c as FormControl));
    this.formArray.clear();
    newArray.controls.forEach(c => this.formArray.push(c));
  }

  private readFile(file: File) {
    if (this.formArray.length >= 3) return;
    const reader = new FileReader();
    reader.onload = () => {
      const id = this._idHelper.generateTempId();
      const url = reader.result as string;
      const order = this.formArray.length + 1;
      const ext = file.name.split('.').at(-1);
      const contentType = file.type;

      this.formArray.push(new FormControl({id, url, order, ext, contentType, file}));
      this._cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }
}
