import { Directive, Input, OnChanges, SimpleChanges, computed, inject, signal } from '@angular/core';
import { type ContentProps } from '@zag-js/tabs';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps } from '@spren-ui/zag-angular';

import { TabsContext } from './tabs';

export type TabsContentProps = ContentProps;

@Directive({
  standalone: true,
})
export class TabContentContext implements TabsContentProps, OnChanges {
  @Input({ required: true }) value!: TabsContentProps['value'];

  readonly inputs = signal<TabsContentProps>({ value: this.value });
  readonly tabs = inject(TabsContext).tabs;

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenTabsContent]',
  standalone: true,
  hostDirectives: [{ directive: TabContentContext, inputs: ['value'] }],
  exportAs: 'tabsContent',
})
export class TabsContent extends HostBindProps {
  readonly #tabsContent = inject(TabContentContext);
  readonly tabs = this.#tabsContent.tabs;
  readonly tabsContent = this.#tabsContent.inputs;

  readonly props = computed(() => this.tabs().getContentProps(this.tabsContent()));
}
