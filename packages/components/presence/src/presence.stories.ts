import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Presence, type PresenceProps } from './presence';
import './presence.css';

const meta = {
  title: 'Presence',
  decorators: [
    moduleMetadata({
      imports: [Presence],
    }),
  ],
} satisfies Meta<PresenceProps>;
export default meta;

type Story = StoryObj<PresenceProps>;

export const Basic: Story = {
  render: () => {
    const present = signal(false);

    return {
      props: { present },
      template: `
      <!--
      present = signal(false);
-->
      <div>
        <button (click)="present.set(!present())">Toggle</button>
        <span *sprenPresence="present()" class="box">Hidden and Hidden</span>
      </div>
    `,
    };
  },
};

export const LazyMount: Story = {
  render: () => {
    const present = signal(false);

    return {
      props: { present },
      template: `
      <!--
      present = signal(false);
-->
      <div>
        <button (click)="present.set(!present())">Toggle</button>
        <span *sprenPresence="present(); lazyMount: true" class="box">Unmounted and Hidden</span>
      </div>
    `,
    };
  },
};

export const UnmountOnExit: Story = {
  render: () => {
    const present = signal(false);

    return {
      props: { present },
      template: `
      <!--
      present = signal(false);
-->
      <div>
        <button (click)="present.set(!present())">Toggle</button>
        <span *sprenPresence="present(); unmountOnExit: true" class="box">Hidden and Unmounted on Exit</span>
      </div>
    `,
    };
  },
};

export const LazyMountAndUnmountOnExit: Story = {
  render: () => {
    const present = signal(false);

    return {
      props: { present },
      template: `
      <!--
      present = signal(false);
-->
      <div>
        <button (click)="present.set(!present())">Toggle</button>
        <span *sprenPresence="present(); lazyMount: true; unmountOnExit: true" class="box">Lazy Mount and Unmounted on Exit</span>
      </div>
    `,
    };
  },
};
