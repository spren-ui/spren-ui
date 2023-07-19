import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Accordion } from './accordion';
import { AccordionContent } from './accordion-content';
import { AccordionItem } from './accordion-item';
import { AccordionTrigger } from './accordion-trigger';

describe('Accordion', () => {
  it('should open the accordion item on start with value', async () => {
    const { detectChanges } = await render(
      `
      <div sprenAccordion value="0">
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.getByTestId('button')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should toggles the accordion on click', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const trigger = screen.getByText('Section 1 title');

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
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
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
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
        <div sprenAccordionItem value="2">
          <h2>
            <button sprenAccordionTrigger data-testid="button3">Section 3 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel3">Panel 3</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('Section 1 title');
    const last = screen.getByText('Section 3 title');

    first.focus();

    await user.keyboard('[Home]');
    expect(first).toHaveFocus();

    await user.keyboard('[End]');
    expect(last).toHaveFocus();
  });

  it('should not collapse the curret visible item', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('Section 1 title');

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
      `
      <div sprenAccordion collapsible>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const firstAccordion = screen.getByText('Section 1 title');

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
      `
      <div sprenAccordion multiple>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('Section 1 title');
    const second = screen.getByText('Section 2 title');

    await user.click(first);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(second);
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have the correct aria attributes', async () => {
    await render(
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const button = screen.getByText('Section 1 title');
    const panel = screen.getByText('Panel 1');

    expect(button).toHaveAttribute('aria-controls');
    expect(button).toHaveAttribute('aria-expanded');
    expect(panel).toHaveAttribute('aria-labelledby');
  });

  it('should move the focus to the next element when pressing tab', async () => {
    const user = userEvent.setup();
    await render(
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
        <div sprenAccordionItem value="2">
          <h2>
            <button sprenAccordionTrigger data-testid="button3">Section 3 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel3">Panel 3</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const first = screen.getByText('Section 1 title');
    const second = screen.getByText('Section 2 title');
    const last = screen.getByText('Section 3 title');

    await user.keyboard('[Tab]');
    expect(first).toHaveFocus();

    await user.keyboard('[Tab]');
    expect(second).toHaveFocus();

    await user.keyboard('[Tab]');
    expect(last).toHaveFocus();
  });

  it('should have the same aria-controls for the button as for the panel', async () => {
    await render(
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const button = screen.getByText('Section 1 title');
    const panel = screen.getByText('Panel 1');
    const button2 = screen.getByText('Section 2 title');
    const panel2 = screen.getByText('Panel 2');

    expect(button).toHaveAttribute('aria-controls', panel.getAttribute('id'));
    expect(button2).toHaveAttribute('aria-controls', panel2.getAttribute('id'));
  });

  it('should set the correct aria-expanded when an item is open/closed', async () => {
    const { detectChanges } = await render(
      `
      <div sprenAccordion value="0">
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
        <div sprenAccordionItem value="1">
          <h2>
            <button sprenAccordionTrigger data-testid="button2">Section 2 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel2">Panel 2</div>
        </div>
      </div>
    `,
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
      `
      <div sprenAccordion>
        <div sprenAccordionItem value="0">
          <h2>
            <button sprenAccordionTrigger data-testid="button">Section 1 title</button>
          </h2>
          <div sprenAccordionContent data-testid="panel">Panel 1</div>
        </div>
      </div>
    `,
      {
        imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
      },
    );

    const panel = screen.getByText('Panel 1');

    expect(panel).toHaveAttribute('aria-labelledby');
    expect(panel).toHaveAttribute('role', 'region');
  });
});
