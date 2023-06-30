import { Component, Input, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Switch, SwitchProps } from './switch';
import { SwitchControl } from './switch-control';
import { SwitchInput } from './switch-input';
import { SwitchLabel } from './switch-label';
import { SwitchThumb } from './switch-thumb';

@Component({
  selector: 'spren-switch-test',
  standalone: true,
  imports: [Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb],
  template: `
    <label sprenSwitch [onChange]="onChange" [checked]="checked">
      <span sprenSwitchLabel>Switch</span>
      <input sprenSwitchInput />
      <div sprenSwitchControl data-testid="control">
        <div sprenSwitchThumb></div>
      </div>
    </label>
  `,
})
class UnderTestComponent {
  @Input() checked: SwitchProps['checked'];
  @Input() onChange: SwitchProps['onChange'];
}

describe('Switch', () => {
  it('should handle check and unchecked', async () => {
    const onChange = vitest.fn();

    const user = userEvent.setup();
    await render(UnderTestComponent, { componentInputs: { onChange } });

    const switchZag = screen.getByRole('checkbox');

    await user.click(switchZag);
    expect(switchZag).toBeChecked();
  });

  it('should allow controlled usage', async () => {
    @Component({
      selector: 'spren-switch-controlled-test',
      standalone: true,
      imports: [UnderTestComponent],
      template: `
        <button (click)="checked.set(true)">set checked</button>
        <spren-switch-test [checked]="checked()" />
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
