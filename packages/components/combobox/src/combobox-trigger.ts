import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: 'button[sprenComboboxTrigger]',
  standalone: true,
  exportAs: 'comboboxTrigger',
})
export class ComboboxTrigger extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().triggerProps);
}
