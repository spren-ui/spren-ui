import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { AccordionItemContext } from './accordion-item';

@Directive({
  selector: '[sprenAccordionContent]',
  standalone: true,
  exportAs: 'accordionContent',
})
export class AccordionContent extends HostBindProps {
  readonly #accordionItem = inject(AccordionItemContext);
  readonly accordion = this.#accordionItem.accordion;
  readonly accordionItem = this.#accordionItem.accordionItem;

  readonly props = computed(() => this.accordion().getContentProps(this.accordionItem()));
}
