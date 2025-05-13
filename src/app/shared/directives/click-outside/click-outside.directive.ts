import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickedInside = this._elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
