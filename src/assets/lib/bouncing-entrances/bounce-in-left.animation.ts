import { animate, animation, AnimationTriggerMetadata, group, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IBounceInLeftAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 3000px
   */
  translate?: string;
}

const bounceInLeft = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
  
        style({ transform: 'rotateY(0deg) translateX(50px) translateZ(520px)', opacity: 1, easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)', offset: 0 }),
        style({ transform: 'rotateY(' + ((!false) ? '-360deg' : '-80deg') + ') translateX(' + ((!false) ? '0px' : '0px') + ') translateZ(' + ((!false) ? '0px' : '0px') + ')', opacity: 1, easing: 'cubic-bezier(0.9, 0.9, 0.9, 1)', offset: 1 })
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ visibility: 'visible', opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
          style({ opacity: 1, easing: 'cubic-bezier(0.15, 0.61, 0.355, 1)', offset: 0.6 }),
          //style({ opacity: 0, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
        ])
      )
    ])
  );

const DEFAULT_DURATION = 1000;

export function bounceInLeftAnimation(options?: IBounceInLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInLeft', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}

export function bounceInLeftOnEnterAnimation(options?: IBounceInLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInLeftOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}
