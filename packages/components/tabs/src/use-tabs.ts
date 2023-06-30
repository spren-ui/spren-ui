import { DOCUMENT } from '@angular/common';
import { Signal, computed, inject } from '@angular/core';
import * as tabs from '@zag-js/tabs';

import { Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for tabs components.
let nextUniqueId = 0;

export type UseTabsProps = Optional<tabs.Context, 'id'>;
export type UseTabsReturn = ReturnType<typeof useTabs>;

export const useTabs = (props: Signal<UseTabsProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `t${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(tabs.machine(initialContext), { context });
  return computed(() => tabs.connect(state(), send, normalizeProps));
};
