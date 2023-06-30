import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: 'button[sprenComboboxClearTrigger]',
  standalone: true,
  exportAs: 'comboboxClearTrigger',
})
export class ComboboxClearTrigger extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().clearTriggerProps);
}
