import { Directive, Input, OnChanges, SimpleChanges, booleanAttribute, computed, inject, signal } from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps, OnMount } from '@spren-ui/zag-angular';

import { UseComboboxProps, useCombobox } from './use-combobox';

export type ComboboxProps = UseComboboxProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class ComboboxContext implements ComboboxProps, OnChanges {
  @Input({ transform: booleanAttribute }) allowCustomValue: ComboboxProps['allowCustomValue'];
  @Input({ transform: booleanAttribute }) ariaHidden: ComboboxProps['ariaHidden'];
  @Input({ transform: booleanAttribute }) autoFocus: ComboboxProps['autoFocus'];
  @Input({ transform: booleanAttribute }) blurOnSelect: ComboboxProps['blurOnSelect'];
  @Input() dir: ComboboxProps['dir'];
  @Input({ transform: booleanAttribute }) disabled: ComboboxProps['disabled'];
  @Input({ transform: booleanAttribute }) focusOnClear: ComboboxProps['focusOnClear'];
  @Input() form: ComboboxProps['form'];
  @Input() getRootNode: ComboboxProps['getRootNode'];
  @Input() id: ComboboxProps['id'];
  @Input() ids: ComboboxProps['ids'];
  @Input() inputBehavior: ComboboxProps['inputBehavior'];
  @Input() inputValue: ComboboxProps['inputValue'];
  @Input({ transform: booleanAttribute }) invalid: ComboboxProps['invalid'];
  @Input() isCustomValue: ComboboxProps['isCustomValue'];
  @Input({ transform: booleanAttribute }) loop: ComboboxProps['loop'];
  @Input() name: ComboboxProps['name'];
  @Input() onClose: ComboboxProps['onClose'];
  @Input() onHighlight: ComboboxProps['onHighlight'];
  @Input() onInputChange: ComboboxProps['onInputChange'];
  @Input() onInteractOutside: ComboboxProps['onInteractOutside'];
  @Input() onOpen: ComboboxProps['onOpen'];
  @Input() onSelect: ComboboxProps['onSelect'];
  @Input({ transform: booleanAttribute }) openOnClick: ComboboxProps['openOnClick'];
  @Input() placeholder: ComboboxProps['placeholder'];
  @Input() positioning: ComboboxProps['positioning'];
  @Input({ transform: booleanAttribute }) readOnly: ComboboxProps['readOnly'];
  @Input({ transform: booleanAttribute }) selectInputOnFocus: ComboboxProps['selectInputOnFocus'];
  @Input() selectionBehavior: ComboboxProps['selectionBehavior'];
  @Input() selectionData: ComboboxProps['selectionData'];
  @Input({ transform: booleanAttribute }) selectOnTab: ComboboxProps['selectOnTab'];
  @Input() translations: ComboboxProps['translations'];

  readonly inputs = signal<ComboboxProps>({});
  readonly combobox = useCombobox(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenCombobox]',
  standalone: true,
  hostDirectives: [
    {
      directive: ComboboxContext,
      inputs: [
        'allowCustomValue',
        'ariaHidden',
        'autoFocus',
        'blurOnSelect',
        'dir',
        'disabled',
        'focusOnClear',
        'form',
        'getRootNode',
        'id',
        'ids',
        'inputBehavior',
        'inputValue',
        'invalid',
        'isCustomValue',
        'loop',
        'name',
        'onClose',
        'onHighlight',
        'onInputChange',
        'onInteractOutside',
        'onOpen',
        'onSelect',
        'openOnClick',
        'placeholder',
        'positioning',
        'readOnly',
        'selectInputOnFocus',
        'selectionBehavior',
        'selectionData',
        'selectOnTab',
        'translations',
      ],
    },
  ],
  exportAs: 'combobox',
})
export class Combobox extends HostBindProps {
  readonly combobox = inject(ComboboxContext).combobox;

  readonly props = computed(() => this.combobox().rootProps);
}
