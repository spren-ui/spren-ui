import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { AccordionItemContext } from './accordion-item';

@Directive({
  selector: 'button[sprenAccordionTrigger]',
  standalone: true,
  exportAs: 'accordionTrigger',
})
export class AccordionTrigger extends HostBindProps {
  readonly #accordionItem = inject(AccordionItemContext);
  readonly accordion = this.#accordionItem.accordion;
  readonly accordionItem = this.#accordionItem.accordionItem;

  readonly props = computed(() => this.accordion().getTriggerProps(this.accordionItem()));
}
