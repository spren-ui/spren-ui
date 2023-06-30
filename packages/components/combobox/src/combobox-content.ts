import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: '[sprenComboboxContent]',
  standalone: true,
  exportAs: 'comboboxContent',
})
export class ComboboxContent extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().contentProps);
}
