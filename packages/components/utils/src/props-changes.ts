import { SimpleChanges, WritableSignal } from '@angular/core';

import { mergeProps } from '@spren-ui/zag-angular';

export function propsChanges<T extends Record<string, any>>(
  inputs: WritableSignal<T>,
  changes: SimpleChanges,
  propsToMerge?: Partial<T>,
) {
  const props = Object.entries(changes).reduce((acc, [key, value]) => {
    const normalizedValue = value.currentValue === '' ? true : value.currentValue;
    acc[key as keyof T] = normalizedValue;
    return acc;
  }, {} as Partial<T>);

  const mergedProps = propsToMerge ? (mergeProps(props, propsToMerge) as Partial<T>) : props;

  inputs.update((inputs) => ({ ...inputs, ...mergedProps }));
}
