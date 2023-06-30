import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { TabsContext } from './tabs';

@Directive({
  selector: '[sprenTabsList]',
  standalone: true,
  exportAs: 'tabsList',
})
export class TabsList extends HostBindProps {
  readonly tabs = inject(TabsContext).tabs;

  readonly props = computed(() => this.tabs().tablistProps);
}
