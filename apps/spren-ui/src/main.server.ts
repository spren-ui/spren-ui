import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import 'zone.js/node';

import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (import.meta.env.PROD) {
  enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default async function render(url: string, document: string) {
  const html = await renderApplication(bootstrap, {
    document,
    url,
  });
  return html;
}

let lastTime = 0;
global['requestAnimationFrame'] = function (callback) {
  const now = new Date().getTime();
  const nextTime = Math.max(lastTime + 16, now);
  return setTimeout(function () {
    callback((lastTime = nextTime));
  }, nextTime - now) as unknown as number;
};

global['cancelAnimationFrame'] = function (id) {
  clearTimeout(id);
};
