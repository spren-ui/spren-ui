import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'spren-ui-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
    <spren-ui-analog-welcome />
  `,
})
export default class HomeComponent {}
