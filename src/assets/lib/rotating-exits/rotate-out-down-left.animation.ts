import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IRotateOutDownLeftAnimationOptions extends IAnimationOptions {
  /**
   * Angle - number of degrees at which end animation.
   *
   * Default 45
   */
  degrees?: number;
}

const rotateOutDownLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, easing: 'ease', offset: 0 }),
        style({ opacity: 0, transform: 'rotate3d(0, 0, 1, {{degrees}}deg)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function rotateOutDownLeftAnimation(options?: IRotateOutDownLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rotateOutDownLeft', [
    transition('0 => 1', [style({ 'transform-origin': 'left bottom' }), ...useAnimationIncludingChildren(rotateOutDownLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        degrees: (options && options.degrees) || 45
      }
    })
  ]);
}

export function rotateOutDownLeftOnLeaveAnimation(options?: IRotateOutDownLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rotateOutDownLeftOnLeave', [
    transition(':leave', [style({ 'transform-origin': 'left bottom' }), ...useAnimationIncludingChildren(rotateOutDownLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        degrees: (options && options.degrees) || 45
      }
    })
  ]);
}
