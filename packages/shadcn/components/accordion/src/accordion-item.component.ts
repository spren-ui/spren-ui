import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { AccordionItem as AccordionItemHeadless } from '@spren-ui/components/accordion';
import { cn } from '@spren-ui/shadcn/utils/cn';

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  imports: [],
  hostDirectives: [AccordionItemHeadless],
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItem {
  @Input() class? = '';
  @HostBinding('class') get elementClass() {
    return cn('block border-b', this.class);
  }
}
