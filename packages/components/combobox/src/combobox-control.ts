import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: '[sprenComboboxControl]',
  standalone: true,
  exportAs: 'comboboxControl',
})
export class ComboboxControl extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().controlProps);
}
