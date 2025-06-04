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

        const rect = this.el.nativeElement.getBoundingClientRect();
        this.renderer.setStyle(this.tooltip, 'top', `${rect.top - 30}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${rect.left}px`);

        this.tooltipVisible = true
      }
    }, 400);
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
