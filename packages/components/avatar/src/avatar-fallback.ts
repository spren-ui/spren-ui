import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { AvatarContext } from './avatar';

@Directive({
  selector: '[sprenAvatarFallback]',
  standalone: true,
  exportAs: 'avatarFallback',
})
export class AvatarFallback extends HostBindProps {
  readonly avatar = inject(AvatarContext).avatar;

  readonly props = computed(() => this.avatar().fallbackProps);
}
