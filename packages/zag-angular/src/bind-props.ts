import {
  type AfterViewInit,
  Directive,
  ElementRef,
  Injector,
  Input,
  Renderer2,
  type Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { mergeProps } from '@zag-js/core';

import { type Dict, type SplitArgs } from './types';

const isFalsy = (value: any) => value === undefined || value === null;

const eventRegex = /^on[A-Z]/;

@Directive()
export abstract class HostBindProps implements AfterViewInit {
  readonly #injector = inject(Injector);
  readonly #renderer2 = inject(Renderer2);
  readonly #nativeElement = inject(ElementRef).nativeElement;

  abstract readonly props: Signal<SplitArgs | Dict>;

  readonly #mergeProps = signal<Partial<SplitArgs> | null>(null);
  readonly #propsContainer = signal<Element | null>(null);

  ngAfterViewInit(): void {
    const props = computed(() => {
      const props = this.props();
      const propsTomerge = this.#mergeProps();
      return propsTomerge ? mergeProps(props, propsTomerge) : props;
    });
    this.#bindProps(props);
  }

  mergeProps(props: Partial<SplitArgs>) {
    this.#mergeProps.set(props);
  }

  propsContainer(container: ElementRef<Element> | Element) {
    const nativeElement = container instanceof ElementRef ? container.nativeElement : container;
    this.#propsContainer.set(nativeElement);
  }

  #bindProps(props: Signal<SplitArgs | Dict>) {
    const nativeElement = this.#propsContainer() || this.#nativeElement;

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
