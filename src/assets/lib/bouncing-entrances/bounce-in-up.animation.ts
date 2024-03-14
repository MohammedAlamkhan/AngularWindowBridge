import { animate, animation, AnimationTriggerMetadata, group, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IBounceInUpAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 3000px
   */
  translate?: string;
}

const bounceInUp = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
  
        
          style({ transform: 'rotateY(-100deg) translateY(0px) translateX(50px) translateZ(150px)', opacity: 1, easing: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)', offset: 0 }),
          style({ transform: 'rotateY(0deg) translateX(0px) translateZ(-50px)', opacity: 1, easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)', offset: 1 })
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ visibility: 'visible', offset: 0 }),
          style({ opacity: 1, offset: 0.6 }),
        ])
      )
    ])
  );

const DEFAULT_DURATION = 1000;

export function bounceInUpAnimation(options?: IBounceInUpAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInUp', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInUp(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}

export function bounceInUpOnEnterAnimation(options?: IBounceInUpAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInUpOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInUp(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}
