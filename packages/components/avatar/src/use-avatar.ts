import { DOCUMENT } from '@angular/common';
import { type Signal, computed, inject } from '@angular/core';
import * as avatar from '@zag-js/avatar';

import { type Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for avatar components.
let nextUniqueId = 0;

export type UseAvatarProps = Optional<avatar.Context, 'id'>;
export type UseAvatarReturn = ReturnType<typeof useAvatar>;

export const useAvatar = (props: Signal<UseAvatarProps>) => {
  const document = inject(DOCUMENT);
  const getRootNode = () => document;

  const initialContext = {
    id: `av${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(avatar.machine(initialContext), { context });
  return computed(() => avatar.connect(state(), send, normalizeProps));
};
