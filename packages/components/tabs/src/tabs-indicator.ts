import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { TabsContext } from './tabs';

@Directive({
  selector: '[sprenTabsIndicator]',
  standalone: true,
  exportAs: 'tabsIndicator',
})
export class TabsIndicator extends HostBindProps {
  readonly tabs = inject(TabsContext).tabs;

  readonly props = computed(() => this.tabs().indicatorProps);
}
