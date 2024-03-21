import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface ISlideOutLeftAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const slideOutLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
        style({ transform: 'translate3d(-{{translate}}, 0, 0)', visibility: 'hidden', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function slideOutLeftAnimation(options?: ISlideOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideOutLeft', [
    transition('0 => 1', [...useAnimationIncludingChildren(slideOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}

export function slideOutLeftOnLeaveAnimation(options?: ISlideOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'slideOutLeftOnLeave', [
    transition(':leave', [...useAnimationIncludingChildren(slideOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}
