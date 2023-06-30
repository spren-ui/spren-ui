import { Directive, Input, OnChanges, SimpleChanges, booleanAttribute, computed, inject, signal } from '@angular/core';
import type { ItemProps } from '@zag-js/accordion';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps } from '@spren-ui/zag-angular';

import { AccordionContext } from './accordion';

export type AccordionItemProps = ItemProps;

@Directive({
  standalone: true,
})
export class AccordionItemContext implements AccordionItemProps, OnChanges {
  @Input({ transform: booleanAttribute }) disabled: AccordionItemProps['disabled'];
  @Input() value: AccordionItemProps['value'] = '';

  readonly inputs = signal<AccordionItemProps>({ value: this.value });
  readonly accordion = inject(AccordionContext).accordion;
  readonly #state = computed(() => this.accordion().getItemState(this.inputs()));
  readonly accordionItem = computed(() => ({ ...this.inputs(), ...this.#state() }));

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenAccordionItem]',
  standalone: true,
  hostDirectives: [{ directive: AccordionItemContext, inputs: ['disabled', 'value'] }],
  exportAs: 'accordionItem',
})
export class AccordionItem extends HostBindProps {
  readonly #accordionItem = inject(AccordionItemContext);
  readonly accordion = this.#accordionItem.accordion;
  readonly accordionItem = this.#accordionItem.accordionItem;

  readonly props = computed(() => this.accordion().getItemProps(this.accordionItem()));
}
