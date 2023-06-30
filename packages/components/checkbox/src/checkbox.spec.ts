import { Component, Input, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Checkbox, CheckboxProps } from './checkbox';
import { CheckboxControl } from './checkbox-control';
import { CheckboxInput } from './checkbox-input';
import { CheckboxLabel } from './checkbox-label';

@Component({
  selector: 'spren-checkbox-test',
  standalone: true,
  imports: [Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel],
  template: `
    <label sprenCheckbox [onChange]="onChange" [checked]="checked">
      <span sprenCheckboxLabel>Checkbox</span>
      <input sprenCheckboxInput />
      <div sprenCheckboxControl data-testid="control"></div>
    </label>
  `,
})
class UnderTestComponent {
  @Input() checked: CheckboxProps['checked'];
  @Input() onChange: CheckboxProps['onChange'];
}

describe('Checkbox', () => {
  it('should handle check and unchecked', async () => {
    const onChange = vitest.fn();

    const user = userEvent.setup();
    await render(UnderTestComponent, { componentInputs: { onChange } });

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should handle indeterminate state properly', async () => {
    const { detectChanges } = await render(UnderTestComponent, { componentInputs: { checked: 'indeterminate' } });

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByTestId('control')).toHaveAttribute('data-indeterminate');
  });

  it('should allow controlled usage', async () => {
    @Component({
      selector: 'spren-checkbox-controlled-test',
      standalone: true,
      imports: [UnderTestComponent],
      template: `
        <button (click)="checked.set(true)">set checked</button>
        <spren-checkbox-test [checked]="checked()" />
      `,
    })
    class UnderTestControlledComponent {
      checked = signal(false);
    }

    const user = userEvent.setup();
    await render(UnderTestControlledComponent);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    await user.click(screen.getByText('set checked'));
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked());
  });
});
