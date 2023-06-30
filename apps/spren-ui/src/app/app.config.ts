import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideFileRouter(), provideClientHydration(), provideHttpClient()],
};
