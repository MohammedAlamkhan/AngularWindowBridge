import { animate, animation, AnimationTriggerMetadata, group, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IBounceInDownAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 3000px
   */
  translate?: string;
}

const bounceInDown = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ transform: 'translate3d(0, -{{translate}}, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
          style({ transform: 'translate3d(0, 25px, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
          style({ transform: 'translate3d(0, -10px, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.75 }),
          style({ transform: 'translate3d(0, 5px, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.9 }),
          style({ transform: 'translate3d(0, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ visibility: 'visible', opacity: 0, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
          style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
          style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
        ])
      )
    ])
  );

const DEFAULT_DURATION = 1000;

export function bounceInDownAnimation(options?: IBounceInDownAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInDown', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInDown(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}

export function bounceInDownOnEnterAnimation(options?: IBounceInDownAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInDownOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInDown(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}
