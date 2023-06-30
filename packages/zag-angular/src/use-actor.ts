import { DestroyRef, inject, signal } from '@angular/core';
import { type Machine, type StateMachine as S } from '@zag-js/core';

import { onMount } from './on-mount';

export function useActor<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject,
>(service: Machine<TContext, TState, TEvent>) {
  const state = signal(service.state);

  let unsubscribe: () => void;

  // ! onMount hack until angular adds new hooks lifecycle
  onMount(() => {
    unsubscribe = service.subscribe((nextState) => {
      state.set(nextState);
    });
  });

  inject(DestroyRef).onDestroy(() => {
    unsubscribe?.();
  });

  return [state.asReadonly(), service.send] as const;
}
