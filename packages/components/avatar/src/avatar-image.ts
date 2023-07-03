import { Directive, computed, inject } from '@angular/core';

import { HostBindProps } from '@spren-ui/zag-angular';

import { AvatarContext } from './avatar';

@Directive({
  selector: 'img[sprenAvatarImage]',
  standalone: true,
  exportAs: 'avatarImage',
})
export class AvatarImage extends HostBindProps {
  readonly avatar = inject(AvatarContext).avatar;

  readonly props = computed(() => this.avatar().imageProps);
}
