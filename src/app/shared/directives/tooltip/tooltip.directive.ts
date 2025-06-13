import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';

  private showTimeout: any;
  private tooltip: HTMLElement | null = null;
  private tooltipVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.addTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip()
  }

  @HostListener('click') onClick() {
    this.removeTooltip();
  }

  private addTooltip(): void {
    if (!this.tooltipText) {
      return;
    }

    this.showTimeout = setTimeout(() => {
      if (!this.tooltipVisible) {
        this.tooltip = this.renderer.createElement('span') as HTMLElement;
        this.tooltip.className = 'tooltip';
        this.tooltip.innerText = this.tooltipText;
        this.renderer.appendChild(document.body, this.tooltip);

        // Тимчасово застосувати стиль max-width, щоб обчислити розміри
        this.renderer.setStyle(this.tooltip, 'max-width', '300px');
        this.renderer.setStyle(this.tooltip, 'white-space', 'normal');
        this.renderer.setStyle(this.tooltip, 'position', 'fixed');
        this.renderer.setStyle(this.tooltip, 'visibility', 'hidden');
        this.renderer.setStyle(this.tooltip, 'left', '0px');
        this.renderer.setStyle(this.tooltip, 'top', '0px');

        const rect = this.el.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();

        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

        // Показати знизу, якщо не вміщається зверху
        if (top < 0) {
          top = rect.bottom + 8;
        }

        // Якщо тултіп вилазить за межі справа — зсунь вліво
        if (left + tooltipRect.width > window.innerWidth) {
          left = window.innerWidth - tooltipRect.width - 8;
        }

        // Якщо вилазить зліва — зсунь вправо
        if (left < 0) {
          left = 8;
        }

        // Застосовуємо фінальні координати
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
        this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltip, 'visibility', 'visible');

        this.tooltipVisible = true;
      }
    }, 1000);
  }

  private removeTooltip(): void {
    clearTimeout(this.showTimeout);

    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }

    this.tooltipVisible = false;
  }
}
