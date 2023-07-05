import { NgIf } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
} from '@angular/core';

import { AccordionContent as AccordionContentHeadless } from '@spren-ui/components/accordion';
import { cn } from '@spren-ui/shadcn/utils/cn';

@Component({
  selector: 'ui-accordion-content',
  standalone: true,
  imports: [NgIf],
  hostDirectives: [AccordionContentHeadless],
  template: `
    <ng-container *ngIf="isPresent()">
      <div class="pb-4 pt-0"><ng-content /></div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionContent implements AfterViewInit {
  readonly #nativeElement = inject(ElementRef).nativeElement;
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #accordionItem = inject(AccordionContentHeadless).accordionItem;
  readonly isPresent = computed(() => this.forceMount || this.#accordionItem().isOpen);

  @Input({ transform: booleanAttribute }) forceMount = false;

  @Input() class? = '';
  @HostBinding('class') get elementClass() {
    return cn(
      this.forceMount ? '[&:not([hidden])]:block' : 'block', // for animations
      'overflow-hidden text-sm transition-all data-[expanded]:animate-accordion-down [&:not([data-expanded])]:animate-accordion-up',
      this.class,
    );
  }

  #height = 0;
  #width = 0;
  @HostBinding('style.--ui-content-height') get contentHeight() {
    return this.#height ? `${this.#height.toFixed(1)}px` : undefined;
  }
  @HostBinding('style.--ui-content-width') get contentWitdh() {
    return this.#width ? `${this.#width.toFixed(1)}px` : undefined;
  }

  ngAfterViewInit(): void {
    // only run on browser
    if (this.forceMount && this.#nativeElement) {
      requestAnimationFrame(() => this.#calculateDimensions());
    }
  }

  readonly #calculateDimensionsEffect =
    this.#nativeElement && // only run on browser
    effect((onCleanup) => {
      const isPresent = this.isPresent(); // track isPresent
      const rAF = requestAnimationFrame(() => isPresent && this.#calculateDimensions());
      onCleanup(() => cancelAnimationFrame(rAF));
    });
  #originalStyles?: Record<string, string>;

  #calculateDimensions() {
    const node = this.#nativeElement;
    if (!node || !node['getBoundingClientRect']) return;

    this.#originalStyles = this.#originalStyles || {
      transitionDuration: node.style.transitionDuration,
      animationName: node.style.animationName,
      hidden: node.hidden,
    };
    // block any animations/transitions so the element renders at its full dimensions
    node.style.transitionDuration = '0s';
    node.style.animationName = 'none';
    node.hidden = false;

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect();
    this.#height = rect.height;
    this.#width = rect.width;

    node.style.transitionDuration = this.#originalStyles['transitionDuration'];
    node.style.animationName = this.#originalStyles['animationName'];
    node.hidden = this.#originalStyles['hidden'];

    this.#cdr.markForCheck();
  }
}
