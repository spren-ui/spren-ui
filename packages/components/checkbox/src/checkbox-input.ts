import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { CheckboxContext } from './checkbox';

@Directive({
  selector: 'input[sprenCheckboxInput]',
  standalone: true,
  exportAs: 'checkboxInput',
})
export class CheckboxInput extends HostBindProps {
  readonly checkbox = inject(CheckboxContext).checkbox;

  readonly props = computed(() => this.checkbox().inputProps);
}
