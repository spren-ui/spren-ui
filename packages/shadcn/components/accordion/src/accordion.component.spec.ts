import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { AccordionContent } from './accordion-content.component';
import { AccordionItem } from './accordion-item.component';
import { AccordionTrigger } from './accordion-trigger.component';
import { Accordion } from './accordion.component';

describe('Accordion', () => {
  it('should open the accordion item on start with value', async () => {
    const { detectChanges } = await render(
      `<ui-accordion value="0">
        <ui-accordion-item value="0">
          <ui-accordion-trigger data-testid="button">Section 1 title</ui-accordion-trigger>
          <ui-accordion-content data-testid="panel">Panel 1</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(within(screen.getByTestId('button')).getByRole('button', { expanded: true })).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should toggles the accordion on click', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>Trigger</ui-accordion-trigger>
          <ui-accordion-content>Panel</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const trigger = screen.getByText('Trigger');

    await user.click(trigger);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // you can't toggle an accordion without passing `allowToggle`
    await user.click(trigger);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should focus the next/previous item on arrow up & down', async () => {
    const user = userEvent.setup();
    await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>Section 1 title</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Section 2 title</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('Section 1 title');
    const second = screen.getByText('Section 2 title');

    first.focus();

    await user.keyboard('[ArrowDown]');
    expect(second).toHaveFocus();

    await user.keyboard('[ArrowUp]');
    expect(first).toHaveFocus();
  });

  it('should focus the first/last item on home & end', async () => {
    const user = userEvent.setup();
    await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>First section</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Second section</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="2">
          <ui-accordion-trigger>Last section</ui-accordion-trigger>
          <ui-accordion-content>Panel 3</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('First section');
    const last = screen.getByText('Last section');

    first.focus();

    await user.keyboard('[Home]');
    expect(first).toHaveFocus();

    await user.keyboard('[End]');
    expect(last).toHaveFocus();
  });

  it('should not collapse the current visible item', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>First section</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Second section</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('First section');

    await user.click(first);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(first);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(first).toHaveAttribute('aria-expanded', 'true');
  });

  it('should collapse the only visible item if the accordiong is collapsible', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `<ui-accordion collapsible>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>First section</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Second section</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const firstAccordion = screen.getByText('First section');

    await user.click(firstAccordion);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');

    await user.click(firstAccordion);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
  });

  it('should be possible to open multiple items in an accordion', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `<ui-accordion multiple>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>First section</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Second section</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('First section');
    const second = screen.getByText('Second section');

    await user.click(first);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(second);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have the correct aria attributes', async () => {
    await render(
      `<ui-accordion>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Section 1 title</ui-accordion-trigger>
          <ui-accordion-content data-testid="panel">Panel 1</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const button = screen.getByText('Section 1 title');
    const panel = screen.getByTestId('panel');

    expect(button).toHaveAttribute('aria-controls');
    expect(button).toHaveAttribute('aria-expanded');
    expect(panel).toHaveAttribute('aria-labelledby');
  });

  it('should move the focus to the next element when pressing tab', async () => {
    const user = userEvent.setup();
    await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>First section</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Second section</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="2">
          <ui-accordion-trigger>Last section</ui-accordion-trigger>
          <ui-accordion-content>Panel 3</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('First section');
    const second = screen.getByText('Second section');
    const last = screen.getByText('Last section');

    await user.keyboard('[Tab]');
    expect(first).toHaveFocus();

    await user.keyboard('[Tab]');
    expect(second).toHaveFocus();

    await user.keyboard('[Tab]');
    expect(last).toHaveFocus();
  });

  it('should have the same aria-controls for the button as for the panel', async () => {
    await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>Section 1 title</ui-accordion-trigger>
          <ui-accordion-content data-testid="panel">Panel 1</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const button = screen.getByText('Section 1 title');
    const panel = screen.getByTestId('panel');
    expect(button).toHaveAttribute('aria-controls', panel.getAttribute('id'));
  });

  it('should set the correct aria-expanded when an item is open/closed', async () => {
    const { detectChanges } = await render(
      `<ui-accordion value="0">
        <ui-accordion-item value="0">
          <ui-accordion-trigger>Section 1 title</ui-accordion-trigger>
          <ui-accordion-content>Panel 1</ui-accordion-content>
        </ui-accordion-item>
        <ui-accordion-item value="1">
          <ui-accordion-trigger>Section 2 title</ui-accordion-trigger>
          <ui-accordion-content>Panel 2</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const button = screen.getByText('Section 1 title');

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have role=region and aria-labelledby', async () => {
    await render(
      `<ui-accordion>
        <ui-accordion-item value="0">
          <ui-accordion-trigger>Section 1 title</ui-accordion-trigger>
          <ui-accordion-content data-testid="panel">Panel 1</ui-accordion-content>
        </ui-accordion-item>
      </ui-accordion>`,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const panel = screen.getByTestId('panel');

    expect(panel).toHaveAttribute('aria-labelledby');
    expect(panel).toHaveAttribute('role', 'region');
  });
});
