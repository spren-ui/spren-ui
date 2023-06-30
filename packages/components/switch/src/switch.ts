import {
  Directive,
  Input,
  type OnChanges,
  type SimpleChanges,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps, OnMount } from '@spren-ui/zag-angular';

import { type UseSwitchProps, useSwitch } from './use-switch';

export type SwitchProps = UseSwitchProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class SwitchContext implements SwitchProps, OnChanges {
  @Input({ transform: booleanAttribute }) checked: SwitchProps['checked'];
  @Input() dir: SwitchProps['dir'];
  @Input({ transform: booleanAttribute }) disabled: SwitchProps['disabled'];
  @Input({ transform: booleanAttribute }) focusable: SwitchProps['focusable'];
  @Input() form: SwitchProps['form'];
  @Input() getRootNode: SwitchProps['getRootNode'];
  @Input() id: SwitchProps['id'];
  @Input() ids: SwitchProps['ids'];
  @Input({ transform: booleanAttribute }) invalid: SwitchProps['invalid'];
  @Input() label: SwitchProps['label'];
  @Input() name: SwitchProps['name'];
  @Input() onChange: SwitchProps['onChange'];
  @Input({ transform: booleanAttribute }) readOnly: SwitchProps['readOnly'];
  @Input({ transform: booleanAttribute }) required: SwitchProps['required'];
  @Input() value: SwitchProps['value'];

  readonly inputs = signal<SwitchProps>({});
  readonly switch = useSwitch(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: 'label[sprenSwitch]',
  standalone: true,
  hostDirectives: [
    {
      directive: SwitchContext,
      inputs: [
        'checked',
        'dir',
        'disabled',
        'focusable',
        'form',
        'getRootNode',
        'id',
        'ids',
        'invalid',
        'label',
        'name',
        'onChange',
        'readOnly',
        'required',
        'value',
      ],
    },
  ],
  exportAs: 'switch',
})
export class Switch extends HostBindProps {
  readonly switch = inject(SwitchContext).switch;

  readonly props = computed(() => this.switch().rootProps);
}
