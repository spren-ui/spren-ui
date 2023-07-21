import { type Signal, computed } from '@angular/core';
import * as switchZag from '@zag-js/switch';

import { useSprenUIEnvironment } from '@spren-ui/components/environment';
import { type Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for switch components.
let nextUniqueId = 0;

export type UseSwitchProps = Optional<switchZag.Context, 'id'>;
export type UseSwitchReturn = ReturnType<typeof useSwitch>;

export const useSwitch = (props: Signal<UseSwitchProps>) => {
  const getRootNode = useSprenUIEnvironment();

  const initialContext = {
    id: `s${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(switchZag.machine(initialContext), { context });
  return computed(() => switchZag.connect(state(), send, normalizeProps));
};
