import { AfterViewInit, Directive, Injector, inject } from '@angular/core';
import { callAll } from '@zag-js/utils';

import type { OnMountOptions } from './types';

/**
 * ! onMount hack until angular adds new hooks lifecycle
 */
@Directive({
  standalone: true,
})
export class OnMount implements AfterViewInit {
  #onMountChainFns?: () => void;

  onMount(fn: () => void) {
    this.#onMountChainFns = callAll(this.#onMountChainFns, fn);
  }

  ngAfterViewInit() {
    if (!this.#onMountChainFns) {
      throw new Error('onMount function is required before component is mounted');
    }
    this.#onMountChainFns();
  }
}

const defaultInjectOptions = { optional: true, self: true };
const fallbackOnMount = {
  onMount: (fn: () => void) => fn(),
};

/**
 * ! onMount hack until angular adds new hooks lifecycle
 */
export const onMount = (
  fn: () => void,
  { injector = inject(Injector), injectOptions = defaultInjectOptions }: OnMountOptions = {},
) => {
  const onMountRef = injector.get(OnMount, fallbackOnMount, injectOptions);
  return onMountRef.onMount(fn);
};
