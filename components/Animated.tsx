import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  FadeOutUp,
  FadeInDown,
  FadeOutDown,
  FadeInLeft,
  FadeOutLeft,
  FadeInRight,
  FadeOutRight,
  BounceIn,
  BounceInDown,
  LightSpeedInLeft,
  LightSpeedInRight,
  LightSpeedOutLeft,
  LightSpeedOutRight,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  Easing,
} from 'react-native-reanimated';
import { STYLES } from '@/lib/constants';

export const elastic = Easing.elastic(2);

export const ReFadeIn = FadeIn.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeOut = FadeOut.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeInUp = FadeInUp.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeOutUp = FadeOutUp.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeInDown = FadeInDown.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeOutDown = FadeOutDown.duration(STYLES.DURATION.DURATION_1000).easing(
  Easing.ease,
);
export const ReFadeInLeft = FadeInLeft.duration(STYLES.DURATION.DURATION_1000).easing(Easing.ease);
export const ReFadeOutLeft = FadeOutLeft.duration(STYLES.DURATION.DURATION_1000).easing(
  Easing.ease,
);
export const ReFadeInRight = FadeInRight.duration(STYLES.DURATION.DURATION_1000).easing(
  Easing.ease,
);
export const ReFadeOutRight = FadeOutRight.duration(STYLES.DURATION.DURATION_1000).easing(
  Easing.ease,
);

export const ReBounceIn = BounceIn.duration(STYLES.DURATION.DURATION_1000 / 2)
  .delay(STYLES.DURATION.DURATION_1000 / 2)
  .randomDelay();
export const ReBounceInDown = BounceInDown.duration(STYLES.DURATION.DURATION_1000 / 2)
  .delay(STYLES.DURATION.DURATION_1000 / 2)
  .randomDelay();

export const ReLightSpeedInLeft = LightSpeedInLeft.duration(
  STYLES.DURATION.DURATION_1000 / 2,
).easing(elastic);
export const ReLightSpeedInRight = LightSpeedInRight.duration(
  STYLES.DURATION.DURATION_1000 / 2,
).easing(elastic);
export const ReLightSpeedOutLeft = LightSpeedOutLeft.duration(
  STYLES.DURATION.DURATION_1000 / 2,
).easing(elastic);
export const ReLightSpeedOutRight = LightSpeedOutRight.duration(
  STYLES.DURATION.DURATION_1000 / 2,
).easing(elastic);

export const ReSlideInLeft = SlideInLeft.duration(STYLES.DURATION.DURATION_2000).easing(
  Easing.linear,
);
export const ReSlideInRight = SlideInRight.duration(STYLES.DURATION.DURATION_2000).easing(
  Easing.linear,
);
export const ReSlideOutLeft = SlideOutLeft.duration(STYLES.DURATION.DURATION_2000).easing(
  Easing.linear,
);
export const ReSlideOutRight = SlideOutRight.duration(STYLES.DURATION.DURATION_2000).easing(
  Easing.linear,
);
