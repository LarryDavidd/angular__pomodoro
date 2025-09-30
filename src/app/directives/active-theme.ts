import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  effect,
  input,
} from '@angular/core';

@Directive({
  selector: '[appActiveTheme]',
})
export class ActiveThemeDirective implements OnInit {
  public darkThemeActive = input<boolean>(false);

  constructor(private element: ElementRef, private renderer: Renderer2) {
    effect(() => {
      this.updateClass();
    });
  }

  ngOnInit() {
    this.updateClass();
  }

  private updateClass(): void {
    if (this.darkThemeActive()) {
      this.renderer.addClass(this.element.nativeElement, 'dark_active');
      this.renderer.removeClass(this.element.nativeElement, 'light_active');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'light_active');
      this.renderer.removeClass(this.element.nativeElement, 'dark_active');
    }
  }
}
