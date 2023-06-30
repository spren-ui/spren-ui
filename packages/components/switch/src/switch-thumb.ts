import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { SwitchContext } from './switch';

@Directive({
  selector: '[sprenSwitchThumb]',
  standalone: true,
  exportAs: 'switchThumb',
})
export class SwitchThumb extends HostBindProps {
  readonly switch = inject(SwitchContext).switch;

  readonly props = computed(() => this.switch().thumbProps);
}
