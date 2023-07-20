import { Component, computed, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';

import { type SprenUIEnvironment, provideSprenUIEnvironment, useSprenUIEnvironment } from './environment';

@Component({
  selector: 'spren-environment-test',
  standalone: true,
  template: `
    <pre aria-label="environment values">{{ stringify }}</pre>
  `,
})
class UnderTestComponent {
  getRootNode = useSprenUIEnvironment();
  readonly rootNode = signal<SprenUIEnvironment | undefined>(this.getRootNode());
  readonly stringify = computed(() => JSON.stringify(this.rootNode(), null, 2));
}

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    await render(UnderTestComponent, {
      providers: [provideSprenUIEnvironment(document)],
    });

    expect(screen.getByLabelText('environment values').innerHTML).not.toBe('""');
  });
});
