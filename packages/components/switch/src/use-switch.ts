import { DOCUMENT } from '@angular/common';
import { Signal, computed, inject } from '@angular/core';
import * as switchZag from '@zag-js/switch';

import { Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for switch components.
let nextUniqueId = 0;

export type UseSwitchProps = Optional<switchZag.Context, 'id'>;
export type UseSwitchReturn = ReturnType<typeof useSwitch>;

export const useSwitch = (props: Signal<UseSwitchProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `s${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(switchZag.machine(initialContext), { context });
  return computed(() => switchZag.connect(state(), send, normalizeProps));
};
