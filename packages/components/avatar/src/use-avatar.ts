import { type Signal, computed } from '@angular/core';
import * as avatar from '@zag-js/avatar';

import { useSprenUIEnvironment } from '@spren-ui/components/environment';
import { type Optional } from '@spren-ui/components/utils';
import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

// Increasing integer for generating unique ids for avatar components.
let nextUniqueId = 0;

export type UseAvatarProps = Optional<avatar.Context, 'id'>;
export type UseAvatarReturn = ReturnType<typeof useAvatar>;

export const useAvatar = (props: Signal<UseAvatarProps>) => {
  const getRootNode = useSprenUIEnvironment();

  const initialContext = {
    id: `av${++nextUniqueId}`,
    getRootNode,
    ...props(),
  };
  const context = computed(() => ({ ...initialContext, ...props() }));

  const [state, send] = useMachine(avatar.machine(initialContext), { context });
  return computed(() => avatar.connect(state(), send, normalizeProps));
};
