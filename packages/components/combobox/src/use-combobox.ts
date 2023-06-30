import { DOCUMENT } from '@angular/common';
import { Signal, computed, inject } from '@angular/core';
import * as combobox from '@zag-js/combobox';

import { Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for combobox components.
let nextUniqueId = 0;

export type UseComboboxProps = Optional<combobox.Context, 'id'>;
export type UseComboboxReturn = ReturnType<typeof useCombobox>;

export const useCombobox = (props: Signal<UseComboboxProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `cb${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(combobox.machine(initialContext), { context });
  return computed(() => combobox.connect(state(), send, normalizeProps));
};
