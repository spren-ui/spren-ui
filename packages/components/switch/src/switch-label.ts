import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { SwitchContext } from './switch';

@Directive({
  selector: '[sprenSwitchLabel]:not(label)',
  standalone: true,
  exportAs: 'switchLabel',
})
export class SwitchLabel extends HostBindProps {
  readonly switch = inject(SwitchContext).switch;

  readonly props = computed(() => this.switch().labelProps);
}
