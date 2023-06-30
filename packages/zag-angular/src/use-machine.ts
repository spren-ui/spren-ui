import { DestroyRef, type Signal, effect, inject, signal } from '@angular/core';
import { type MachineSrc, type StateMachine as S } from '@zag-js/core';

import { onMount } from './on-mount';

type HookOptions<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject,
> = Omit<S.HookOptions<TContext, TState, TEvent>, 'context'> & {
  context?: Signal<S.UserContext<TContext>> | S.UserContext<TContext>;
};

export function useService<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject,
>(machine: MachineSrc<TContext, TState, TEvent>, options?: HookOptions<TContext, TState, TEvent>) {
  const { actions, state: hydratedState, context } = options ?? {};

  const service = (() => {
    const _machine = typeof machine === 'function' ? machine() : machine;
    const contextValue = typeof context === 'function' ? context() : context;
    return contextValue ? _machine.withContext(contextValue) : _machine;
  })();

  // ! onMount hack until angular adds new hooks lifecycle
  onMount(() => {
    Promise.resolve().then(() => {
      service.start(hydratedState);

      if (service.state.can('SETUP')) {
        service.send('SETUP');
      }
    });
  });

  inject(DestroyRef).onDestroy(() => {
    service.stop();
  });

  effect(() => {
    const contextValue = typeof context === 'function' ? context() : context;
    service.setContext(contextValue);
  });

  service.setOptions({ actions });

  return service;
}

export function useMachine<
  TContext extends Record<string, any>,
  TState extends S.StateSchema,
  TEvent extends S.EventObject = S.AnyEventObject,
>(machine: MachineSrc<TContext, TState, TEvent>, options?: HookOptions<TContext, TState, TEvent>) {
  const service = useService(machine, options);

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

  return [state.asReadonly(), service.send, service] as const;
}
