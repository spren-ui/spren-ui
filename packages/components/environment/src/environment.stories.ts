import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { AccordionContent } from './accordion-content';
import { AccordionItem } from './accordion-item';
import { AccordionTrigger } from './accordion-trigger';
import { Accordion, type AccordionContext, type AccordionProps } from './environment';

const meta = {
  title: 'Accordion',
  decorators: [
    moduleMetadata({
      imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
    }),
  ],
} satisfies Meta<AccordionContext>;
export default meta;

type Story = StoryObj<AccordionContext>;

export const Basic: Story = {
  render: () => ({
    template: `
      <div sprenAccordion>
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const Initial: Story = {
  render: () => ({
    template: `
      <div sprenAccordion value="2">
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const RenderProp: Story = {
  render: () => ({
    template: `
      <div sprenAccordion collapsible>
        <div sprenAccordionItem value="1" #i1="accordionItem">
          <h3>
            <button sprenAccordionTrigger>{{ i1.accordionItem().isOpen ? 'Close' : 'Open' }}</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2" #i2="accordionItem">
          <h3>
            <button sprenAccordionTrigger>{{ i2.accordionItem().isOpen ? 'Close' : 'Open' }}</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3" #i3="accordionItem">
          <h3>
            <button sprenAccordionTrigger>{{ i3.accordionItem().isOpen ? 'Close' : 'Open' }}</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const Collapsible: Story = {
  render: () => ({
    template: `
      <div sprenAccordion collapsible>
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <div sprenAccordion multiple>
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const Controlled: Story = {
  render: () => {
    const value = signal<AccordionProps['value']>(null);
    const onChange: AccordionProps['onChange'] = (details) => value.set(details.value);

    return {
      props: { value, onChange },
      template: `
      <!--
      value = signal<AccordionProps['value']>(null);
      onChange: AccordionProps['onChange'] = (details) => value.set(details.value);
-->
      <div sprenAccordion [value]="value()" [onChange]="onChange">
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
    };
  },
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div sprenAccordion orientation="vertical">
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2">
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div sprenAccordion multiple>
        <div sprenAccordionItem value="1">
          <h3>
            <button sprenAccordionTrigger>Section 1 title</button>
          </h3>
          <div sprenAccordionContent>Panel 1</div>
        </div>
        <div sprenAccordionItem value="2" disabled>
          <h3>
            <button sprenAccordionTrigger>Section 2 title</button>
          </h3>
          <div sprenAccordionContent>Panel 2</div>
        </div>
        <div sprenAccordionItem value="3">
          <h3>
            <button sprenAccordionTrigger>Section 3 title</button>
          </h3>
          <div sprenAccordionContent>Panel 3</div>
        </div>
      </div>
    `,
  }),
};
