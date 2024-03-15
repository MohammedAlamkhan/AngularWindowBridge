import { animate, animation, AnimationTriggerMetadata, group, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IBounceInRightAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 3000px
   */
  translate?: string;
}

const bounceInRight = () =>
  animation(
    group([
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
        style({ visibility: "visible", transform: 'rotateY(0deg) translateY(0px) translateX(0px) translateZ(0px)', opacity: 1, easing: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)', offset: 0 }),
        style({ visibility: "visible", transform: 'translateY(0px) translateX(-400px) translateZ(-50px) rotateY(-110deg) ', opacity: 1, easing: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)', offset: 1 })
        ])
      ),
      animate(
        '{{duration}}ms {{delay}}ms',
        keyframes([
          style({ visibility: 'visible', offset: 0 }),
          style({ visibility: "visible", opacity: 1, offset: 0.6 }),
        ])
      )
    ])
  );

const DEFAULT_DURATION = 1000;

export function bounceInRightAnimation(options?: IBounceInRightAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInRight', [
    transition('0 => 1', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInRight(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}

export function bounceInRightOnEnterAnimation(options?: IBounceInRightAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceInRightOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), ...useAnimationIncludingChildren(bounceInRight(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '3000px'
      }
    })
  ]);
}
