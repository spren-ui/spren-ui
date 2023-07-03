import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Avatar, type AvatarProps } from './avatar';
import { AvatarFallback } from './avatar-fallback';
import { AvatarImage } from './avatar-image';
import './avatar.css';

export default {
  title: 'Avatar',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Avatar, AvatarImage, AvatarFallback],
    }),
  ],
} as Meta<AvatarProps>;

type Story = StoryObj<AvatarProps>;

export const Basic: Story = {
  render: () => ({
    template: `
      <div sprenAvatar>
        <img sprenAvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
        <span sprenAvatarFallback>SM</span>
      </div>
    `,
  }),
};

export const Events: Story = {
  render: () => {
    const onError: AvatarProps['onError'] = () => console.log('error');
    const onLoad: AvatarProps['onLoad'] = () => console.log('loaded');

    return {
      props: { onError, onLoad },
      template: `
      <!--
      onError: AvatarProps['onError'] = () => console.log('error');
      onLoad: AvatarProps['onLoad'] = () => console.log('loaded');
-->
      <div sprenAvatar [onError]="onError" [onLoad]="onLoad">
        <img sprenAvatarImage src="https://i.pravatar.cc/300" alt="avatar" />
        <span sprenAvatarFallback>SM</span>
      </div>
    `,
    };
  },
};
