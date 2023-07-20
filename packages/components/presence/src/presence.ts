import { NgIf } from '@angular/common';
import {
  Directive,
  ElementRef,
  Injector,
  Input,
  type OnChanges,
  type OnInit,
  Renderer2,
  type SimpleChanges,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';

import { type UsePresenceProps, usePresence } from './use-presence';

export type PresenceContextProps = UsePresenceProps;
export type PresenceProps = PresenceContextProps & {
  /**
   * Whether to enable lazy mounting. Defaults to `false`.
   */
  lazyMount?: boolean;
  /**
   * Whether to unmount on exit. Defaults to `false`.
   */
  unmountOnExit?: boolean;
};

@Directive({
  standalone: true,
})
export class PresenceContext implements PresenceContextProps, OnChanges {
  @Input() present!: PresenceProps['present'];
  @Input() onExitComplete: PresenceProps['onExitComplete'];

  readonly inputs = signal<PresenceProps>({ present: this.present });
  readonly presence = (() => {
    const presence = usePresence(this.inputs);

    const nativeElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const isRealNode = !!nativeElement.getBoundingClientRect;
    isRealNode && presence().setNode(nativeElement);

    return presence;
  })();

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenPresence]',
  standalone: true,
  hostDirectives: [
    {
      directive: PresenceContext,
      inputs: ['present: sprenPresence', 'onExitComplete: sprenPresenceOnExitComplete'],
    },
    {
      directive: NgIf,
      inputs: ['ngIfElse: sprenPresenceElse'],
    },
  ],
  exportAs: 'presence',
})
export class Presence implements PresenceProps, OnInit {
  readonly #ngIfDirective = inject(NgIf);
  readonly #injector = inject(Injector);
  readonly #renderer2 = inject(Renderer2);
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #container: HTMLElement | null = null;
  #wasEverPresent = false;

  @Input({ alias: 'sprenPresence', required: true }) set present(value: PresenceProps['present']) {
    if (this.#container) {
      this.#renderer2.setAttribute(this.#container, 'data-state', value ? 'open' : 'closed');
    }
  }
  @Input({ alias: 'sprenPresenceLazyMount' }) lazyMount: PresenceProps['lazyMount'];
  @Input({ alias: 'sprenPresenceUnmountOnExit' }) unmountOnExit: PresenceProps['unmountOnExit'];

  readonly presenceContext = inject(PresenceContext);
  readonly presence = this.presenceContext.presence;

  ngOnInit(): void {
    effect(
      () => {
        const { isPresent } = this.presence();

        if (isPresent) {
          this.#wasEverPresent = true;
        }
        const skipLazyMount = !isPresent && !this.#wasEverPresent && this.lazyMount;
        const skipUnmountOnExit = this.unmountOnExit && !isPresent && this.#wasEverPresent;
        const shouldRender = !skipLazyMount && !skipUnmountOnExit;

        this.#ngIfDirective.ngIf = shouldRender;

        const node = this.#elementRef.nativeElement.previousElementSibling as HTMLElement | null;

        if (shouldRender && node) {
          untracked(() => {
            this.#container = node;
            this.presence().setNode(node);
            this.#renderer2.setProperty(node, 'hidden', !isPresent);
            this.#renderer2.setAttribute(node, 'data-state', this.presenceContext.present ? 'open' : 'closed');
          });
        }
      },
      { injector: this.#injector },
    );
  }
}
