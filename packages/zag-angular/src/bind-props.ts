import {
  type AfterViewInit,
  Directive,
  ElementRef,
  InjectionToken,
  Injector,
  Input,
  Renderer2,
  type Signal,
  effect,
  inject,
  signal,
} from '@angular/core';

import { type Dict, type SplitArgs } from './types';

const isFalsy = (value: any) => value === undefined || value === null;

const eventRegex = /^on[A-Z]/;

export interface CustomBindProps {
  bindProps?: Signal<SplitArgs>;
  bindPropsElement?: ElementRef<any>;
}

export const CUSTOM_BIND_PROPS_TOKEN = new InjectionToken<CustomBindProps>('CUSTOM_BIND_PROPS_TOKEN');

@Directive()
export abstract class HostBindProps implements AfterViewInit {
  readonly #injector = inject(Injector);
  readonly #customBindProps = inject(CUSTOM_BIND_PROPS_TOKEN, { optional: true, self: true });
  readonly #renderer2 = inject(Renderer2);
  readonly #nativeElement = inject(ElementRef).nativeElement;

  abstract readonly props: Signal<SplitArgs | Dict>;

  ngAfterViewInit(): void {
    this.#bindProps(this.#customBindProps?.bindProps ?? this.props);
  }

  #bindProps(props: Signal<SplitArgs | Dict>) {
    const nativeElement = this.#customBindProps?.bindPropsElement?.nativeElement ?? this.#nativeElement;

    effect(
      () => {
        const {
          attrs,
          props: { style, ...restProps },
        } = props();

        Object.entries(attrs).forEach(([key, value]) => {
          isFalsy(value)
            ? this.#renderer2.removeAttribute(nativeElement, key)
            : this.#renderer2.setAttribute(nativeElement, key, value as string);
        });

        Object.entries(restProps).forEach(([key, value]) => {
          const normalizedKey = eventRegex.test(key) ? key.toLowerCase() : key;
          const normalizedValue = isFalsy(value) ? '' : value;
          this.#renderer2.setProperty(nativeElement, normalizedKey, normalizedValue);
        });

        style &&
          Object.entries(style).forEach(([key, value]) => {
            this.#renderer2.setStyle(nativeElement, key, value === undefined ? null : value);
          });
      },
      { injector: this.#injector },
    );
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[bindProps]',
  standalone: true,
})
export class BindProps extends HostBindProps {
  readonly #props = signal<SplitArgs>({ attrs: {}, props: {} });
  @Input({ required: true }) set bindProps(value: SplitArgs) {
    this.#props.set(value);
  }

  readonly props = this.#props.asReadonly();
}
