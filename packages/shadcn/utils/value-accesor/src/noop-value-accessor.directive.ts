import { Directive } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NoopValueAccessorDirective,
      multi: true,
    },
  ],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
  /* eslint-disable */
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  /* eslint-enable */
}
