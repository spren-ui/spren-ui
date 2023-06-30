import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { CheckboxContext } from './checkbox';

@Directive({
  selector: '[sprenCheckboxLabel]:not(label)',
  standalone: true,
  exportAs: 'checkboxLabel',
})
export class CheckboxLabel extends HostBindProps {
  readonly checkbox = inject(CheckboxContext).checkbox;

  readonly props = computed(() => this.checkbox().labelProps);
}
