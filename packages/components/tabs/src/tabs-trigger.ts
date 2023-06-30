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
import { type TriggerProps } from '@zag-js/tabs';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps } from '@spren-ui/zag-angular';

import { TabsContext } from './tabs';

export type TabsTriggerProps = TriggerProps;

@Directive({
  standalone: true,
})
export class TabTriggerContext implements TabsTriggerProps, OnChanges {
  @Input({ transform: booleanAttribute }) disabled: TabsTriggerProps['disabled'];
  @Input({ required: true }) value!: TabsTriggerProps['value'];

  readonly inputs = signal<TabsTriggerProps>({ value: this.value });
  readonly tabs = inject(TabsContext).tabs;

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: 'button[sprenTabsTrigger], a[sprenTabsTrigger]',
  standalone: true,
  hostDirectives: [{ directive: TabTriggerContext, inputs: ['disabled', 'value'] }],
  exportAs: 'tabsTrigger',
})
export class TabsTrigger extends HostBindProps {
  readonly #tabsTrigger = inject(TabTriggerContext);
  readonly tabs = this.#tabsTrigger.tabs;
  readonly tabsTrigger = this.#tabsTrigger.inputs;

  readonly props = computed(() => this.tabs().getTriggerProps(this.tabsTrigger()));
}
