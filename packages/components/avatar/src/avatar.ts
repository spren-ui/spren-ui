import { Directive, Input, type OnChanges, type SimpleChanges, computed, inject, signal } from '@angular/core';

import { propsChanges } from '@spren-ui/components/utils';
import { HostBindProps, OnMount } from '@spren-ui/zag-angular';

import { type UseAvatarProps, useAvatar } from './use-avatar';

export type AvatarProps = UseAvatarProps;

@Directive({
  standalone: true,
  hostDirectives: [OnMount],
})
export class AvatarContext implements AvatarProps, OnChanges {
  @Input() getRootNode: AvatarProps['getRootNode'];
  @Input() id: AvatarProps['id'];
  @Input() onError: AvatarProps['onError'];
  @Input() onLoad: AvatarProps['onLoad'];

  readonly inputs = signal<AvatarProps>({});
  readonly avatar = useAvatar(this.inputs);

  ngOnChanges(changes: SimpleChanges): void {
    propsChanges(this.inputs, changes);
  }
}

@Directive({
  selector: '[sprenAvatar]',
  standalone: true,
  hostDirectives: [
    {
      directive: AvatarContext,
      inputs: ['getRootNode', 'id', 'onError', 'onLoad'],
    },
  ],
  exportAs: 'avatar',
})
export class Avatar extends HostBindProps {
  readonly avatar = inject(AvatarContext).avatar;

  readonly props = computed(() => this.avatar().rootProps);
}
