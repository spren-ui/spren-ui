import { signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { Presence } from './presence';

describe('Presence', () => {
  it('should control presence when not lazy mounting and not unmounting on exit', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <button (click)="present.set(!present())">Toggle</button>
      <span *sprenPresence="present()" data-testid="box">I am a red box</span>
      `,
      {
        componentProperties: {
          present: signal(false),
        },
        imports: [Presence],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeVisible();
  });

  it('should control presence when lazy mounting and not unmounting on exit', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <button (click)="present.set(!present())">Toggle</button>
      <span *sprenPresence="present(); lazyMount: true" data-testid="box">I am a red box</span>
      `,
      {
        componentProperties: {
          present: signal(false),
        },
        imports: [Presence],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeVisible();
  });

  it('should control presence when not lazy mounting and unmounting on exit', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <button (click)="present.set(!present())">Toggle</button>
      <span *sprenPresence="present(); unmountOnExit: true" data-testid="box">I am a red box</span>
      `,
      {
        componentProperties: {
          present: signal(false),
        },
        imports: [Presence],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();
  });

  it('should control presence when lazy mounting and unmounting on exit', async () => {
    const user = userEvent.setup();
    const { detectChanges } = await render(
      `
      <button (click)="present.set(!present())">Toggle</button>
      <span *sprenPresence="present(); lazyMount: true; unmountOnExit: true" data-testid="box">I am a red box</span>
      `,
      {
        componentProperties: {
          present: signal(false),
        },
        imports: [Presence],
      },
    );

    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).toBeVisible();

    await user.click(screen.getByRole('button'));
    detectChanges(); // Renderer2 doesn't trigger change detection
    expect(screen.queryByTestId('box')).not.toBeInTheDocument();
  });
});
