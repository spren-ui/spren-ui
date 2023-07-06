import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Accordion as AccordionHeadless } from '@spren-ui/components/accordion';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [],
  hostDirectives: [AccordionHeadless],
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {}
