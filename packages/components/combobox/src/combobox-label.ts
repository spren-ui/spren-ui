import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: 'label[sprenComboboxLabel]',
  standalone: true,
  exportAs: 'comboboxLabel',
})
export class ComboboxLabel extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().labelProps);
}
