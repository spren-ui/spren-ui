import { Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsContext, type TabsProps } from './tabs';
import { TabsContent } from './tabs-content';
import { TabsIndicator } from './tabs-indicator';
import { TabsList } from './tabs-list';
import { TabsTrigger } from './tabs-trigger';

@Component({
  selector: 'spren-tabs-test',
  standalone: true,
  imports: [TabsContent, TabsIndicator, TabsList, TabsTrigger, Tabs],
  template: `
    <div sprenTabs [value]="value" [onChange]="handleChange" [onFocus]="handleFocus">
      <div sprenTabsList>
        <button sprenTabsTrigger value="one">Tab 1</button>
        <button sprenTabsTrigger value="two">Tab 2</button>
        <button sprenTabsTrigger value="three" disabled>Tab 3</button>
        <span sprenTabsIndicator></span>
      </div>
      <div sprenTabsContent value="one">Content 1</div>
      <div sprenTabsContent value="two">Content 2</div>
      <div sprenTabsContent value="three">Content 3</div>
    </div>
    <div>
      <span>Focused:</span>
      {{ focusedVal() }}
    </div>
    <div data-testid="change-content">
      <span>Changed:</span>
      {{ changedVal() }}
    </div>
    <button type="button">Lose focus</button>
  `,
})
class UnderTestComponent extends TabsContext {
  readonly focusedVal = signal<TabsProps['value']>(null);
  readonly changedVal = signal<TabsProps['value']>(null);

  handleFocus: TabsProps['onFocus'] = ({ value }) => {
    this.focusedVal.set(value);
  };
  handleChange: TabsProps['onChange'] = ({ value }) => {
    this.changedVal.set(value);
  };
}

describe('Tabs', () => {
  it('should render the content of tabe one by default', async () => {
    const { detectChanges } = await render(UnderTestComponent, { componentInputs: { value: 'one' } });

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('should show the active panel and hide other panels', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(UnderTestComponent);

    await user.click(screen.getByRole('tab', { name: 'Tab 1' }));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByText('Content 1')).toBeVisible();

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByText('Content 2')).toBeVisible();
    expect(screen.getByText('Content 1')).not.toBeVisible();
  });

  it('should show the active panel and hide other panels (expanded)', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(UnderTestComponent);

    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
    await user.click(tab3);
    detectChanges(); // Renderer2 doesn't trigger change detection
    // Because tab 3 is disabled, there should be no change in state
    expect(screen.getByText('Content 3')).not.toBeVisible();

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    await user.click(tab1);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByText('Content 1')).toBeVisible();

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByText('Content 1')).not.toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('should show the active panel and hide other panels (keyboard)', async () => {
    const user = userEvent.setup();
    await render(UnderTestComponent);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' }); // disabled tab

    tab1.focus();
    expect(tab1).toHaveFocus();

    await user.keyboard('[ArrowRight]');
    await waitFor(() => expect(tab2).toHaveFocus());

    await user.keyboard('[ArrowRight]');
    // skip disabled tab, loop to next element
    expect(tab3).not.toHaveFocus();
    await waitFor(() => expect(tab1).toHaveFocus());
  });

  it('handles focus and change events', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(UnderTestComponent);

    const changeTestId = screen.getByTestId('change-content');
    // Making sure that this has not been fired
    expect(changeTestId).toHaveTextContent(/^Changed:$/);

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    // Making sure this does not have focus
    expect(tab1).not.toHaveFocus();

    await user.click(tab1);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(tab1).toHaveFocus();
    expect(changeTestId).toHaveTextContent('Changed: one');

    // User clicks away from tabs to lose focus, but change event does not fire
    await user.click(screen.getByRole('button', { name: 'Lose focus' }));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(tab1).not.toHaveFocus();
    expect(changeTestId).toHaveTextContent('Changed: one');

    // User gives focus back to tab one and changes focus to tab 3
    tab1.focus();
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(tab1).toHaveFocus();

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    tab2.focus();
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(tab2).toHaveFocus();
    expect(changeTestId).toHaveTextContent('Changed: one');
  });
});
