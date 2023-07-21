import { DOCUMENT } from '@angular/common';
import { InjectionToken, Injector, inject } from '@angular/core';

export type SprenUIEnvironment = ShadowRoot | Document | Node;

export const SPRENUI_ENVIRONMENT_REF = new InjectionToken<SprenUIEnvironment>(
  'Configure all Spren UI components for a custom environment like iframe, Shadow DOM or Electron',
  {
    providedIn: 'root',
    factory() {
      return inject(DOCUMENT);
    },
  },
);

export function provideSprenUIEnvironment(value: SprenUIEnvironment) {
  return {
    provide: SPRENUI_ENVIRONMENT_REF,
    useValue: value,
  };
}

export function useSprenUIEnvironment({ injector = inject(Injector) } = {}) {
  const rootNode = injector.get(SPRENUI_ENVIRONMENT_REF);
  return () => rootNode;
}
