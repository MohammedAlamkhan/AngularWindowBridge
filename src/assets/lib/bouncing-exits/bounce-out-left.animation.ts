import { animate, animation, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';
import { IAnimationOptions } from '../common/interfaces';
import { useAnimationIncludingChildren } from '../common/use-animation-including-children';

export interface IBounceOutLeftAnimationOptions extends IAnimationOptions {
  /**
   * Translate, possible units: px, %, em, rem, vw, vh
   *
   * Default: 2000px
   */
  translate?: string;
}

const bounceOutLeft = () =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([
        style({ opacity: 1, transform: 'rotateX(-360deg)', easing: 'ease', offset: 1 }),
      ])
    )
  ]);

const DEFAULT_DURATION = 1000;

export function bounceOutLeftAnimation(options?: IBounceOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceOutLeft', [
    transition('0 => 1', [...useAnimationIncludingChildren(bounceOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}

export function bounceOutLeftOnLeaveAnimation(options?: IBounceOutLeftAnimationOptions): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'bounceOutLeftOnLeave', [
    transition(':leave', [...useAnimationIncludingChildren(bounceOutLeft(), options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
        translate: (options && options.translate) || '2000px'
      }
    })
  ]);
}
