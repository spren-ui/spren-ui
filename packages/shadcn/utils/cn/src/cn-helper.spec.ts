import { render, screen } from '@testing-library/angular';

import { CNHelper } from './cn-helper.directive';

describe('CNHelper', () => {
  it('should work a component that uses the directive without classNames', async () => {
    await render('<div cnHelper data-testid="testDirective"></div>', {
      imports: [CNHelper],
    });

    expect(screen.getByTestId('testDirective')).toBeInTheDocument();
    expect(screen.getByTestId('testDirective')).not.toHaveClass();
  });

  it('should work a component that uses the directive with classNames', async () => {
    await render('<div cnHelper data-testid="testDirective" class="test-class" #c="cnHelper">{{ c.class() }}</div>', {
      imports: [CNHelper],
    });

    expect(screen.getByTestId('testDirective')).toBeInTheDocument();
    expect(screen.getByTestId('testDirective')).not.toHaveClass();
    expect(screen.getByText('test-class')).toBeInTheDocument();
  });
});
