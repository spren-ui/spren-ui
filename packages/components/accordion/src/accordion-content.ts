import { Directive, ElementRef, computed, effect, inject } from '@angular/core';

import { PresenceContext } from '@spren-ui/components/presence';
import { HostBindProps, type SplitArgs, mergeProps } from '@spren-ui/zag-angular';

import { AccordionItemContext } from './accordion-item';

@Directive({
  selector: '[sprenAccordionContent]',
  standalone: true,
  hostDirectives: [{ directive: PresenceContext, inputs: ['onExitComplete'] }],
  exportAs: 'accordionContent',
})
export class AccordionContent extends HostBindProps {
  readonly #accordionItem = inject(AccordionItemContext);
  readonly accordion = this.#accordionItem.accordion;
  readonly accordionItem = this.#accordionItem.accordionItem;
  readonly #isOpen = computed(() => this.accordionItem().isOpen);

  readonly presence = (() => {
    const presenceContext = inject(PresenceContext);
    const nativeElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const presence = presenceContext.presence;

    presence().setNode(nativeElement);
    effect(
      () => {
        const isOpen = this.#isOpen();
        presenceContext.inputs.update((inputs) => ({ ...inputs, present: isOpen }));
      },
      { allowSignalWrites: true },
    );

    return presence;
  })();
  readonly isPresent = computed(() => this.presence().isPresent);

  readonly #contentProps = computed(() => this.accordion().getContentProps(this.accordionItem()));
  readonly props = computed(() => {
    const contentProps = this.#contentProps();
    const isPresent = this.isPresent();

    // If hidden content, wait for Presence to update the hidden prop
    return contentProps.props['hidden']
      ? ({
          ...contentProps,
          props: mergeProps(contentProps.props, { hidden: !isPresent }),
        } as SplitArgs)
      : contentProps;
  });
}
