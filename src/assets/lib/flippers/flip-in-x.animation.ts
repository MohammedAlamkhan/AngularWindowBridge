import { animate, animation, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IFlipInXAnimationOptions extends IAnimationOptions {
  /**
   * Angle - number of degrees from which to start animation.
   *
   * Default 90
   */
  degrees?: number;
}

const flipInX = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'perspective(400px) rotate3d(1, 0, 0, {{degrees}}deg)',
          opacity: 0,
          easing: 'ease-in',
          offset: 0
        }),
        style({ transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', opacity: 0.5, easing: 'ease-in', offset: 0.4 }),
        style({ transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', opacity: 1, easing: 'ease-in', offset: 0.6 }),
        style({ transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', easing: 'ease', offset: 0.8 }),
        style({ transform: 'perspective(400px)', easing: 'ease', offset: 1 })
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function flipInXAnimation(options?: IFlipInXAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'flipInX', [
    transition(
      '0 => 1',
      [style({ visibility: 'hidden' }), style({ 'backface-visibility': 'visible' }), ...useAnimationIncludingChildren(flipInX(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 90
        }
      }
    )
  ]);
}

export function flipInXOnEnterAnimation(options?: IFlipInXAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'flipInXOnEnter', [
    transition(
      ':enter',
      [style({ visibility: 'hidden' }), style({ 'backface-visibility': 'visible' }), ...useAnimationIncludingChildren(flipInX(), options)],
      {
        params: {
          delay: (options && options.delay) || 0,
          duration: (options && options.duration) || DEFAULT_DURATION,
          degrees: (options && options.degrees) || 90
        }
      }
    )
  ]);
}
