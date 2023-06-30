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

import { type UseTabsProps, useTabs } from './use-tabs';

export type TabsProps = UseTabsProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class TabsContext implements TabsProps, OnChanges {
  @Input() activationMode: TabsProps['activationMode'];
  @Input() dir: TabsProps['dir'];
  @Input() getRootNode: TabsProps['getRootNode'];
  @Input() id: TabsProps['id'];
  @Input() ids: TabsProps['ids'];
  @Input({ transform: booleanAttribute }) loop: TabsProps['loop'];
  @Input() onChange: TabsProps['onChange'];
  @Input() onDelete: TabsProps['onDelete'];
  @Input() onFocus: TabsProps['onFocus'];
  @Input() orientation: TabsProps['orientation'];
  @Input() translations: TabsProps['translations'];
  @Input() value: TabsProps['value'];

  readonly inputs = signal<TabsProps>({});
  readonly tabs = useTabs(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenTabs]',
  standalone: true,
  hostDirectives: [
    {
      directive: TabsContext,
      inputs: [
        'activationMode',
        'dir',
        'getRootNode',
        'id',
        'ids',
        'loop',
        'onChange',
        'onDelete',
        'onFocus',
        'orientation',
        'translations',
        'value',
      ],
    },
  ],
  exportAs: 'tabs',
})
export class Tabs extends HostBindProps {
  readonly tabs = inject(TabsContext).tabs;

  readonly props = computed(() => this.tabs().rootProps);
}
