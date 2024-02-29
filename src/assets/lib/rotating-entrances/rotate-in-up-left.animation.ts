import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IRotateInUpLeftAnimationOptions extends IAnimationOptions {
  /**
   * Angle - number of degrees from which to start animation.
   *
   * Default 45
   */
  degrees?: number;
}

const rotateInUpLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ visibility: 'visible', opacity: 0, transform: 'rotate3d(0, 0, 1, {{degrees}}deg)', easing: 'ease', offset: 0 }),
        style({ opacity: 1, transform: 'rotate3d(0, 0, 1, 0deg)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function rotateInUpLeftAnimation(options?: IRotateInUpLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rotateInUpLeft', [
    transition(
      '0 => 1',
      [
        style({ visibility: 'hidden' }),
        style({ 'transform-origin': 'left bottom' }),
        ...useAnimationIncludingChildren(rotateInUpLeft(), options)
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 45
        }
      }
    )
  ]);
}

export function rotateInUpLeftOnEnterAnimation(options?: IRotateInUpLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'rotateInUpLeftOnEnter', [
    transition(
      ':enter',
      [
        style({ visibility: 'hidden' }),
        style({ 'transform-origin': 'left bottom' }),
        ...useAnimationIncludingChildren(rotateInUpLeft(), options)
      ],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 45
        }
      }
    )
  ]);
}
