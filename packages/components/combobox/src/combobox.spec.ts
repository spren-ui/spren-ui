import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import {
  Combobox,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  type ComboboxOptionProps,
  ComboboxPositioner,
  ComboboxTrigger,
} from '../';
import { Portal } from '../../';

@Component({
  selector: 'spren-combobox-test',
  standalone: true,
  imports: [
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
  template: `
    <div sprenCombobox openOnClick [onInputChange]="onInputChange">
      <label sprenComboboxLabel>JS Frameworks</label>
      <div sprenComboboxControl>
        <input sprenComboboxInput />
        <button sprenComboboxTrigger data-testid="trigger-btn">Open ▼</button>
      </div>
      <ng-template portal>
        <div sprenComboboxPositioner>
          <ul sprenComboboxContent>
            <li
              sprenComboboxOption
              *ngFor="let item of options"
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
})
class UnderTestComponent extends ComboboxContext {
  readonly options: Pick<ComboboxOptionProps, 'label' | 'value' | 'disabled'>[] = [
    { label: 'ReactJS', value: 'react' },
    { label: 'SolidJS', value: 'solid' },
    { label: 'VueJS', value: 'vue', disabled: true },
    { label: 'AngularJS', value: 'angular' },
  ];
}

describe('Combobox', () => {
  it('should show options on click', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(UnderTestComponent);

    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible();

    await user.click(screen.getByRole('combobox'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    await waitFor(() => expect(screen.getByRole('option', { name: 'ReactJS' })).toBeVisible());
  });

  it('should show a disabled option', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(UnderTestComponent);

    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible();

    await user.click(screen.getByRole('combobox'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByRole('option', { name: 'VueJS' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('should call onInputChange when value changes', async () => {
    const onInputChange = vitest.fn();

    const user = userEvent.setup();
    await render(UnderTestComponent, { componentInputs: { onInputChange } });

    expect(screen.getByRole('option', { hidden: true, name: 'ReactJS' })).not.toBeVisible();

    const inputField = screen.getByRole('combobox');
    await user.type(inputField, 'react');
    expect(inputField).toHaveValue('react');
    expect(onInputChange).toHaveBeenCalledWith({ value: 'react' });
  });
});
