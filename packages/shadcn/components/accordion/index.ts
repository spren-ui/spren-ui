import { AccordionContent } from './src/accordion-content.component';
import { AccordionItem } from './src/accordion-item.component';
import { AccordionTrigger } from './src/accordion-trigger.component';
import { Accordion } from './src/accordion.component';

export const AccordionComponents = [Accordion, AccordionItem, AccordionTrigger, AccordionContent] as const;

export type { AccordionItemProps, AccordionProps } from '@spren-ui/components/accordion';
export * from './src/accordion-content.component';
export * from './src/accordion-item.component';
export * from './src/accordion-trigger.component';
export * from './src/accordion.component';
