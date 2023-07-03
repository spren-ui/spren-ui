import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { Switch, type SwitchProps } from './switch';
import { SwitchControl } from './switch-control';
import { SwitchInput } from './switch-input';
import { SwitchLabel } from './switch-label';
import { SwitchThumb } from './switch-thumb';
import './switch.css';

export default {
  title: 'Switch',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb],
    }),
  ],
} as Meta<SwitchProps>;

type Story = StoryObj<SwitchProps>;

export const Basic: Story = {
  render: () => ({
    template: `
      <label sprenSwitch>
        <input sprenSwitchInput />
        <div sprenSwitchControl>
          <span sprenSwitchThumb></span>
        </div>
        <span sprenSwitchLabel>Label</span>
      </label>
    `,
  }),
};

export const Controlled: Story = {
  render: () => {
    const checked = signal(false);
    const onChange: SwitchProps['onChange'] = (e) => checked.set(e.checked);

    return {
      props: { checked, onChange },
      template: `
      <!--
      checked = signal(false);
      onChange: SwitchProps['onChange'] = (e) => checked.set(e.checked);
-->
      <label sprenSwitch [checked]="checked()" [onChange]="onChange">
        <input sprenSwitchInput />
        <div sprenSwitchControl>
          <span sprenSwitchThumb></span>
        </div>
        <span sprenSwitchLabel>Label</span>
      </label>
    `,
    };
  },
};

export const RenderProp: Story = {
  render: () => ({
    template: `
      <label sprenSwitch #s="switch">
        <input sprenSwitchInput />
        <div sprenSwitchControl>
          <span sprenSwitchThumb></span>
        </div>
        <span sprenSwitchLabel>Feature is {{ s.switch().isChecked ? 'enabled' : 'disabled' }}</span>
      </label>
    `,
  }),
};
