import { NgIf } from '@angular/common';
import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { type CheckedState } from '../';
import { Checkbox, type CheckboxProps } from './checkbox';
import { CheckboxControl } from './checkbox-control';
import { CheckboxInput } from './checkbox-input';
import { CheckboxLabel } from './checkbox-label';
import './checkbox.css';

const meta = {
  title: 'Checkbox',
  decorators: [
    moduleMetadata({
      imports: [Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel],
    }),
  ],
} satisfies Meta<CheckboxProps>;
export default meta;

type Story = StoryObj<CheckboxProps>;

export const Basic: Story = {
  render: () => ({
    template: `
      <label sprenCheckbox>
        <span sprenCheckboxLabel>Checkbox</span>
        <input sprenCheckboxInput />
        <div sprenCheckboxControl></div>
      </label>
    `,
  }),
};

export const Controlled: Story = {
  render: () => {
    const checked = signal<CheckedState>(true);
    const onChange: CheckboxProps['onChange'] = (e) => checked.set(e.checked);

    return {
      props: { checked, onChange },
      template: `
      <!--
      checked = signal<CheckedState>(true);
      onChange: CheckboxProps['onChange'] = (e) => checked.set(e.checked);
-->
      <label sprenCheckbox [checked]="checked()" [onChange]="onChange">
        <span sprenCheckboxLabel>Checkbox</span>
        <input sprenCheckboxInput />
        <div sprenCheckboxControl></div>
      </label>
    `,
    };
  },
};

export const Indeterminate: Story = {
  render: () => ({
    template: `
      <label sprenCheckbox checked="indeterminate" #c="checkbox">
        <span sprenCheckboxLabel>Checkbox</span>
        <input sprenCheckboxInput />
        <div sprenCheckboxControl>
          <span *ngIf="c.checkbox().isIndeterminate">-</span>
        </div>
      </label>
    `,
    moduleMetadata: {
      imports: [NgIf],
    },
  }),
};

export const RenderProp: Story = {
  render: () => ({
    template: `
      <label sprenCheckbox #c="checkbox">
        <span sprenCheckboxLabel>Checkbox</span>
        <input sprenCheckboxInput />
        <div sprenCheckboxControl>
          <span *ngIf="c.checkbox().isChecked">✓</span>
          <span *ngIf="c.checkbox().isIndeterminate">-</span>
        </div>
      </label>
    `,
    moduleMetadata: {
      imports: [NgIf],
    },
  }),
};
