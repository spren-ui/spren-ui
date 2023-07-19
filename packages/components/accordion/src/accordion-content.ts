import { Directive, ElementRef, computed, effect, inject } from '@angular/core';

import { PresenceContext } from '@spren-ui/components/presence';
import { HostBindProps, type SplitArgs, mergeProps } from '@spren-ui/zag-angular';

import { AccordionItemContext } from './accordion-item';

@Directive({
  selector: '[sprenAccordionContent]',
  standalone: true,
  hostDirectives: [PresenceContext],
  exportAs: 'accordionContent',
})
export class AccordionContent extends HostBindProps {
  readonly #accordionItem = inject(AccordionItemContext);
  readonly accordion = this.#accordionItem.accordion;
  readonly accordionItem = this.#accordionItem.accordionItem;
  readonly #isOpen = computed(() => this.accordionItem().isOpen);

  readonly #presenceContext = (() => {
    const presenceContext = inject(PresenceContext);
    const nativeElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

    presenceContext.presence().setNode(nativeElement);
    effect(
      () => {
        const isOpen = this.#isOpen();
        presenceContext.inputs.update((inputs) => ({ ...inputs, present: isOpen }));
      },
      { allowSignalWrites: true },
    );

    return presenceContext;
  })();

  readonly isPresent = computed(() => this.#presenceContext.presence().isPresent);

  readonly props = computed(() => {
    const props = this.accordion().getContentProps(this.accordionItem());
    const isPresent = this.isPresent();
    return mergeProps(props, { props: { hidden: !isPresent } } as Partial<SplitArgs>);
  });
}
