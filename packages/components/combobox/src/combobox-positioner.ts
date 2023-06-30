import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

@Directive({
  selector: '[sprenComboboxPositioner]',
  standalone: true,
  exportAs: 'comboboxPositioner',
})
export class ComboboxPositioner extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().positionerProps);
}
