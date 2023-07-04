import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Tabs, type TabsProps } from './tabs';
import { TabsContent } from './tabs-content';
import { TabsIndicator } from './tabs-indicator';
import { TabsList } from './tabs-list';
import { TabsTrigger } from './tabs-trigger';
import './tabs.css';

const meta = {
  title: 'Tabs',
  decorators: [
    moduleMetadata({
      imports: [TabsContent, TabsIndicator, TabsList, TabsTrigger, Tabs],
    }),
  ],
} satisfies Meta<TabsProps>;
export default meta;

type Story = StoryObj<TabsProps>;

export const Basic: Story = {
  render: () => ({
    template: `
      <div sprenTabs>
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};

export const InitialTab: Story = {
  render: () => ({
    template: `
      <div sprenTabs value="react">
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};

export const Indicator: Story = {
  render: () => ({
    template: `
      <div sprenTabs>
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
          <span sprenTabsIndicator></span>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};

export const DisabledTab: Story = {
  render: () => ({
    template: `
      <div sprenTabs value="react">
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue" disabled>Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};

export const Controlled: Story = {
  render: () => {
    const value = signal<string | null>('react');
    const onChange: TabsProps['onChange'] = (e) => value.set(e.value);

    return {
      props: { value, onChange },
      template: `
      <!--
      value = signal<string | null>('react');
      onChange: TabsProps['onChange'] = (e) => value.set(e.value);
-->
      <div sprenTabs [value]="value()" [onChange]="onChange">
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
    };
  },
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div sprenTabs orientation="vertical" value="react">
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};

export const Manual: Story = {
  render: () => ({
    template: `
      <div sprenTabs activationMode="manual" value="react">
        <div sprenTabsList>
          <button sprenTabsTrigger value="react">React</button>
          <button sprenTabsTrigger value="vue">Vue</button>
          <button sprenTabsTrigger value="solid">Solid</button>
        </div>
        <div sprenTabsContent value="react">React Content</div>
        <div sprenTabsContent value="vue">Vue Content</div>
        <div sprenTabsContent value="solid">Solid Content</div>
      </div>
    `,
  }),
};
