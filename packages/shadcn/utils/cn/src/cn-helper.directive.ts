import { Directive, ElementRef, Input, Renderer2, inject, signal } from '@angular/core';

@Directive({
  standalone: true,
})
export class CNHelperBase {
  readonly #renderer2 = inject(Renderer2);
  readonly #nativeElement = inject(ElementRef).nativeElement;

  readonly _class = signal('');
  @Input('class') set className(value: string) {
    this._class.set(value);
    this.#renderer2.removeAttribute(this.#nativeElement, 'class');
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cnHelper]',
  standalone: true,
  hostDirectives: [{ directive: CNHelperBase, inputs: ['class'] }],
  exportAs: 'cnHelper',
})
export class CNHelper {
  readonly class = inject(CNHelperBase)._class.asReadonly();
}
