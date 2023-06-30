import { Directive, Input, OnChanges, SimpleChanges, booleanAttribute, computed, inject, signal } from '@angular/core';
import { type OptionProps } from '@zag-js/combobox';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

export type ComboboxOptionProps = OptionProps;

@Directive({
  standalone: true,
})
export class ComboboxOptionContext implements ComboboxOptionProps, OnChanges {
  @Input() count: ComboboxOptionProps['count'];
  @Input({ transform: booleanAttribute }) disabled: ComboboxOptionProps['disabled'];
  @Input({ required: true }) label!: ComboboxOptionProps['label'];
  @Input({ required: true }) value!: ComboboxOptionProps['value'];
  @Input() index: ComboboxOptionProps['index'];

  readonly inputs = signal<ComboboxOptionProps>({ label: this.label, value: this.value });
  readonly combobox = inject(ComboboxContext).combobox;
  readonly #state = computed(() => this.combobox().getOptionState(this.inputs()));
  readonly comboboxOption = computed(() => ({ ...this.inputs(), ...this.#state() }));

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenComboboxOption]',
  standalone: true,
  hostDirectives: [{ directive: ComboboxOptionContext, inputs: ['count', 'disabled', 'label', 'value', 'index'] }],
  exportAs: 'comboboxOption',
})
export class ComboboxOption extends HostBindProps {
  readonly #comboboxOption = inject(ComboboxOptionContext);
  readonly combobox = this.#comboboxOption.combobox;
  readonly comboboxOption = this.#comboboxOption.comboboxOption;

  readonly props = computed(() => this.combobox().getOptionProps(this.comboboxOption()));
}
