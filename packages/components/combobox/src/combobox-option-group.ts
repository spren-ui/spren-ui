import { Directive, Input, OnChanges, SimpleChanges, computed, inject, signal } from '@angular/core';
import { type OptionGroupProps } from '@zag-js/combobox';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps } from '@spren-ui/zag-angular';

import { ComboboxContext } from './combobox';

export type ComboboxOptionGroupProps = OptionGroupProps;

@Directive({
  standalone: true,
})
export class ComboboxOptionGroupContext implements ComboboxOptionGroupProps, OnChanges {
  @Input({ required: true }) label!: ComboboxOptionGroupProps['label'];

  readonly inputs = signal<ComboboxOptionGroupProps>({ label: this.label });
  readonly combobox = inject(ComboboxContext).combobox;

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenComboboxOptionGroup]',
  standalone: true,
  hostDirectives: [{ directive: ComboboxOptionGroupContext, inputs: ['label'] }],
  exportAs: 'comboboxOptionGroup',
})
export class ComboboxOptionGroup extends HostBindProps {
  readonly #comboboxOptionGroup = inject(ComboboxOptionGroupContext);
  readonly combobox = this.#comboboxOptionGroup.combobox;
  readonly comboboxOptionGroup = this.#comboboxOptionGroup.inputs;

  readonly props = computed(() => this.combobox().getOptionGroupProps(this.comboboxOptionGroup()));
}
