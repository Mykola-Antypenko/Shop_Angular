import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private element: ElementRef) {}

  @HostBinding('class.highlighted') private isHighlight!: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHighlight = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHighlight = false;
  }
}
