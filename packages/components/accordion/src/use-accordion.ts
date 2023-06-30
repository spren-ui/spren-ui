import { DOCUMENT } from '@angular/common';
import { type Signal, computed, inject } from '@angular/core';
import * as accordion from '@zag-js/accordion';

import { type Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for accordion components.
let nextUniqueId = 0;

export type UseAccordionProps = Optional<accordion.Context, 'id'>;
export type UseAccordionReturn = ReturnType<typeof useAccordion>;

export const useAccordion = (props: Signal<UseAccordionProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `a${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(accordion.machine(initialContext), { context });
  return computed(() => accordion.connect(state(), send, normalizeProps));
};
