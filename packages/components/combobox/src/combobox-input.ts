import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: 'input[sprenComboboxInput]',
  standalone: true,
  exportAs: 'comboboxInput',
})
export class ComboboxInput extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().inputProps);
}
