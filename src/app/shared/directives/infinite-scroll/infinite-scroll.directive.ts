import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  scrollChange = output<void>();

  @Input() options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.zone.run(() => this.scrollChange.emit());
        }
      }, this.options);

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
