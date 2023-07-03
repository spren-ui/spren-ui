import { NgFor, NgIf } from '@angular/common';
import { signal } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  type ComboboxOptionProps,
  ComboboxPositioner,
  type ComboboxProps,
  ComboboxTrigger,
} from '../';
import { Portal } from '../../';
import './combobox.css';

export default {
  title: 'Combobox',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        NgIf,
        NgFor,
        Combobox,
        ComboboxContent,
        ComboboxControl,
        ComboboxInput,
        ComboboxLabel,
        ComboboxOption,
        ComboboxPositioner,
        ComboboxTrigger,
        Portal,
      ],
    }),
  ],
} as Meta<ComboboxProps>;

type Story = StoryObj<ComboboxProps>;

const comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
  { label: 'ReactJS', value: 'react' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'VueJS', value: 'vue', disabled: true },
  { label: 'AngularJS', value: 'angular' },
];

export const Basic: Story = {
  render: () => {
    const options = signal(comboboxData);
    const handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
      const filtered = comboboxData.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      options.set(filtered.length > 0 ? filtered : comboboxData);
    };

    return {
      props: { options, handleInputChange },
      template: `
      <!--
      comboboxData: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
        { label: 'ReactJS', value: 'react' },
        { label: 'SolidJS', value: 'solid' },
        { label: 'VueJS', value: 'vue', disabled: true },
        { label: 'AngularJS', value: 'angular' },
      ];

      options = signal(comboboxData);
      handleInputChange: ComboboxProps['onInputChange'] = ({ value }) => {
        const filtered = comboboxData.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
        options.set(filtered.length > 0 ? filtered : comboboxData);
      };
-->
      <div sprenCombobox [onInputChange]="handleInputChange" #c="combobox">
        <label sprenComboboxLabel>JS Frameworks</label>
        <div sprenComboboxControl>
          <input sprenComboboxInput />
          <button sprenComboboxTrigger>Open ▼</button>
        </div>

        <div *ngIf="c.combobox().isInputValueEmpty && !c.combobox().isOpen">
          Give me you favorite framework!
        </div>

        <ng-template portal>
          <div sprenComboboxPositioner>
            <ul sprenComboboxContent>
              <li
                sprenComboboxOption
                *ngFor="let item of options()"
                [label]="item.label"
                [value]="item.value"
                [disabled]="item?.disabled"
              >
                {{ item.label }}
              </li>
            </ul>
          </div>
        </ng-template>
      </div>
    `,
    };
  },
};
