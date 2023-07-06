import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject } from '@angular/core';

import { AccordionTrigger as AccordionTriggerHeadless } from '@spren-ui/components/accordion';
import { CNHelper, cn } from '@spren-ui/shadcn/utils';

@Component({
  selector: 'ui-accordion-trigger',
  standalone: true,
  imports: [AccordionTriggerHeadless],
  hostDirectives: [CNHelper],
  template: `
    <h3 class="flex">
      <button sprenAccordionTrigger [class]="className()">
        <ng-content />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="h-4 w-4 transition-transform duration-200"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </h3>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTrigger {
  readonly #cnHelper = inject(CNHelper);
  readonly className = computed(() =>
    cn(
      'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180',
      this.#cnHelper.class(),
    ),
  );
}
