import { JsonPipe } from '@angular/common';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { type SprenUIEnvironment, provideSprenUIEnvironment } from './environment';

const meta = {
  title: 'Environment',
  decorators: [
    moduleMetadata({
      imports: [JsonPipe],
      providers: [provideSprenUIEnvironment(document)],
    }),
  ],
} satisfies Meta<SprenUIEnvironment>;
export default meta;

type Story = StoryObj<SprenUIEnvironment>;

export const Basic: Story = {
  render: () => {
    //const getRootNode = useSprenUIEnvironment();
    const getRootNode = () => document;

    return {
      props: { getRootNode },
      template: `
        <!--
        getRootNode = useSprenUIEnvironment();
-->
        <pre>{{ getRootNode() | json }}</pre>
      `,
    };
  },
};
