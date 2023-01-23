import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

interface IStyleConfig {
  color: string;
  background: string;
  border: string;
  fontSize: string;
}

@Directive({
  selector: '[appStylize]'
})
export class StylizeDirective {
  @Input() styleConfig: IStyleConfig = {
    color: 'inherit',
    background: 'inherit',
    border: 'inherit',
    fontSize: 'inherit',
  }

  element!: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  @HostListener('click')
  onClick(): void {
    this.renderer.setStyle(this.element, 'color', this.styleConfig.color);
    this.renderer.setStyle(this.element, 'background', this.styleConfig.background);
    this.renderer.setStyle(this.element, 'border', this.styleConfig.border);
    this.renderer.setStyle(this.element, 'font-size', this.styleConfig.fontSize);
  }
}
