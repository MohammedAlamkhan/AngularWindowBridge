import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface ILightSpeedInAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 100%
   */
  translate?: string;
}

const lightSpeedIn = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d({{translate}}, 0, 0) skewX(-30deg)',
          easing: 'ease-out',
          offset: 0
        }),
        style({ opacity: 1, transform: 'skewX(20deg)', easing: 'ease-out', offset: 0.6 }),
        style({ opacity: 1, transform: 'skewX(-5deg)', easing: 'ease-out', offset: 0.8 }),
        style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease-out', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function lightSpeedInAnimation(options?: ILightSpeedInAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'lightSpeedIn', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(lightSpeedIn(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}

export function lightSpeedInOnEnterAnimation(options?: ILightSpeedInAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'lightSpeedInOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(lightSpeedIn(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '100%'
      }
    })
  ]);
}
