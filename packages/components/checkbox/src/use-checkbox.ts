import { DOCUMENT } from '@angular/common';
import { Signal, computed, inject } from '@angular/core';
import * as checkbox from '@zag-js/checkbox';

import { Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

export type UseCheckboxProps = Optional<checkbox.Context, 'id'>;
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

export const useCheckbox = (props: Signal<UseCheckboxProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `c${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(checkbox.machine(initialContext), { context });
  return computed(() => checkbox.connect(state(), send, normalizeProps));
};
