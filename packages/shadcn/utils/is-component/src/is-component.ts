import { ElementRef, inject } from '@angular/core';

export const injectIsComponent = (componentSelector = '-', elementRef = inject(ElementRef)) => {
  return !!(elementRef.nativeElement as HTMLElement).tagName.toLowerCase().includes(componentSelector.toLowerCase());
};
