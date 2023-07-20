import { type Signal, computed } from '@angular/core';
import * as accordion from '@zag-js/accordion';

import { useSprenUIEnvironment } from '@spren-ui/components/environment';
import { type Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for accordion components.
let nextUniqueId = 0;

export type UseAccordionProps = Optional<accordion.Context, 'id'>;
export type UseAccordionReturn = ReturnType<typeof useAccordion>;

export const useAccordion = (props: Signal<UseAccordionProps>) => {
  const getRootNode = useSprenUIEnvironment();

  const initialContext = {
    id: `a${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(accordion.machine(initialContext), { context });
  return computed(() => accordion.connect(state(), send, normalizeProps));
};
