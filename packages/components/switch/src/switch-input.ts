import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { SwitchContext } from './switch';

@Directive({
  selector: 'input[sprenSwitchInput]',
  standalone: true,
  exportAs: 'switchInput',
})
export class SwitchInput extends HostBindProps {
  readonly switch = inject(SwitchContext).switch;

  readonly props = computed(() => this.switch().inputProps);
}
