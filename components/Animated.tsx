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
  Easing,
} from 'react-native-reanimated';
import { STYLES } from '@/lib/constants';
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
