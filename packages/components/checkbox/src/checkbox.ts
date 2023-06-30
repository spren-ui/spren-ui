import { Directive, Input, OnChanges, SimpleChanges, booleanAttribute, computed, inject, signal } from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps, OnMount } from '@spren-ui/zag-angular';

import { UseCheckboxProps, useCheckbox } from './use-checkbox';

export type CheckboxProps = UseCheckboxProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class CheckboxContext implements CheckboxProps, OnChanges {
  @Input() checked: CheckboxProps['checked'];
  @Input() dir: CheckboxProps['dir'];
  @Input({ transform: booleanAttribute }) disabled: CheckboxProps['disabled'];
  @Input() form: CheckboxProps['form'];
  @Input() getRootNode: CheckboxProps['getRootNode'];
  @Input() id: CheckboxProps['id'];
  @Input() ids: CheckboxProps['ids'];
  @Input({ transform: booleanAttribute }) invalid: CheckboxProps['invalid'];
  @Input() name: CheckboxProps['name'];
  @Input() onChange: CheckboxProps['onChange'];
  @Input({ transform: booleanAttribute }) required: CheckboxProps['required'];
  @Input() value: CheckboxProps['value'];

  readonly inputs = signal<CheckboxProps>({});
  readonly checkbox = useCheckbox(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: 'label[sprenCheckbox]',
  standalone: true,
  hostDirectives: [
    {
      directive: CheckboxContext,
      inputs: [
        'checked',
        'dir',
        'disabled',
        'form',
        'getRootNode',
        'id',
        'ids',
        'invalid',
        'name',
        'onChange',
        'required',
        'value',
      ],
    },
  ],
  exportAs: 'checkbox',
})
export class Checkbox extends HostBindProps {
  readonly checkbox = inject(CheckboxContext).checkbox;

  readonly props = computed(() => this.checkbox().rootProps);
}
