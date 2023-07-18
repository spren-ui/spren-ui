import { type Signal, computed } from '@angular/core';
import * as presence from '@zag-js/presence';

import { normalizeProps, useMachine } from '@spren-ui/zag-angular';

export type UsePresenceProps = presence.Context;
export type UsePresenceReturn = ReturnType<typeof usePresence>;

export const usePresence = (props: Signal<UsePresenceProps>) => {
  const [state, send] = useMachine(presence.machine(props()), { context: props });
  return computed(() => presence.connect(state(), send, normalizeProps), {
    equal: (a, b) => a.isPresent === b.isPresent,
  });
};
