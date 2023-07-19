import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
export class AccordionContent {
  readonly #nativeElement = inject(ElementRef).nativeElement;
  readonly #accordionContent = inject(AccordionContentHeadless);

  /**
   * Whether to force mounting. Defaults to `false`.
   */
  @Input({ transform: booleanAttribute }) forceMount = false;
  /**
   * Whether to unmount on exit. Defaults to `false`.
   */
  @Input({ transform: booleanAttribute }) unmountOnExit = false;

  @Input() class? = '';
  @HostBinding('class') get elementClass() {
    return cn(
      '[&:not([hidden])]:block', // for animations
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      this.class,
    );
  }

  #wasEverPresent = false;
  readonly isPresent = computed(() => {
    const isPresent = this.#accordionContent.isPresent();
    if (isPresent) {
      this.#wasEverPresent = true;
    }
    const forceMount = !isPresent && this.forceMount && !this.#wasEverPresent;
    return isPresent || forceMount || (!this.unmountOnExit && this.#wasEverPresent);
  });

  #height = 0;
  #width = 0;
  @HostBinding('style.--ui-content-height') get contentHeight() {
    return this.#height ? `${this.#height.toFixed(1)}px` : undefined;
  }
  @HostBinding('style.--ui-content-width') get contentWitdh() {
    return this.#width ? `${this.#width.toFixed(1)}px` : undefined;
  }

  readonly #isBrowser = () => !!this.#nativeElement?.['getBoundingClientRect'];
  readonly #calculateDimensionsEffect =
    this.#isBrowser() &&
    effect((onCleanup) => {
      if (this.isPresent()) {
        const rAF = requestAnimationFrame(() => this.#calculateDimensions());
        onCleanup(() => cancelAnimationFrame(rAF));
      }
    });
  #originalStyles?: Record<string, string>;

  #calculateDimensions() {
    const node = this.#nativeElement;

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
  }
}
