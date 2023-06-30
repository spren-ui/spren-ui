import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { CheckboxContext } from './checkbox';

@Directive({
  selector: '[sprenCheckboxControl]',
  standalone: true,
  exportAs: 'checkboxControl',
})
export class CheckboxControl extends HostBindProps {
  readonly checkbox = inject(CheckboxContext).checkbox;

  readonly props = computed(() => this.checkbox().controlProps);
}
