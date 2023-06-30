import {
  Directive,
  Input,
  type OnChanges,
  type SimpleChanges,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps, OnMount } from '@spren-ui/zag-angular';

import { type UseAccordionProps, useAccordion } from './use-accordion';

export type AccordionProps = UseAccordionProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class AccordionContext implements AccordionProps, OnChanges {
  @Input({ transform: booleanAttribute }) collapsible: AccordionProps['collapsible'];
  @Input() dir: AccordionProps['dir'];
  @Input({ transform: booleanAttribute }) disabled: AccordionProps['disabled'];
  @Input() getRootNode: AccordionProps['getRootNode'];
  @Input() id: AccordionProps['id'];
  @Input() ids: AccordionProps['ids'];
  @Input({ transform: booleanAttribute }) multiple: AccordionProps['multiple'];
  @Input() onChange: AccordionProps['onChange'];
  @Input() value: AccordionProps['value'];
  @Input() orientation: AccordionProps['orientation'];

  readonly inputs = signal<AccordionProps>({});
  readonly accordion = useAccordion(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenAccordion]',
  standalone: true,
  hostDirectives: [
    {
      directive: AccordionContext,
      inputs: [
        'collapsible',
        'dir',
        'disabled',
        'getRootNode',
        'id',
        'ids',
        'multiple',
        'onChange',
        'value',
        'orientation',
      ],
    },
  ],
  exportAs: 'accordion',
})
export class Accordion extends HostBindProps {
  readonly accordion = inject(AccordionContext).accordion;

  readonly props = computed(() => this.accordion().rootProps);
}
