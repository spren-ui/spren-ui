import { JsonPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { render, screen } from '@testing-library/angular';

import { provideSprenUIEnvironment, useSprenUIEnvironment } from './environment';

@Component({
  selector: 'spren-environment-test',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <pre aria-label="environment values">{{ stringify }}</pre>
  `,
})
class UnderTestComponent {
  readonly getRootNode = useSprenUIEnvironment();
  readonly stringify = computed(() => JSON.stringify(this.getRootNode(), null, 2));
}

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    await render(UnderTestComponent, {
      providers: [provideSprenUIEnvironment(document)],
    });

    expect(screen.getByLabelText('environment values').innerHTML).not.toBe('""');
  });
});
