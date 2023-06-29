import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[portal]',
  standalone: true,
})
export class Portal implements OnInit {
  readonly #appRef = inject(ApplicationRef);
  readonly #destroyRef = inject(DestroyRef);
  readonly #renderer2 = inject(Renderer2);
  readonly #templateRef = inject(TemplateRef<HTMLElement>);

  /**
   * The container element to which the portal should be attached.
   *
   * @default document.body
   */
  @Input() container: ElementRef<Element> | Element = inject(DOCUMENT).body;

  ngOnInit() {
    const container = this.container instanceof ElementRef ? this.container.nativeElement : this.container;

    const portalNode: HTMLElement = this.#renderer2.createElement('portal');
    this.#renderer2.appendChild(container, portalNode);

    const view = this.#templateRef.createEmbeddedView(null);
    view.rootNodes.forEach((node) => {
      this.#renderer2.appendChild(portalNode, node);
    });

    this.#appRef.attachView(view);

    this.#destroyRef.onDestroy(() => {
      this.#renderer2.removeChild(container, portalNode);
      this.#appRef.detachView(view);
      view.destroy();
    });
  }
}
