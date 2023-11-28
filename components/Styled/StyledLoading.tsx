import { useEffect, useMemo } from 'react';
import {
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  ActivityIndicator,
  RefreshControl,
  RefreshControlProps,
} from 'react-native';
import { Skeleton, makeStyles, useTheme } from '@rneui/themed';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
  withTiming,
  WithTimingConfig,
  withSpring,
  WithSpringConfig,
  Easing,
} from 'react-native-reanimated';
import { STYLES } from '@/lib/constants';
import { i18n } from '@/lib/i18n';

export const StyledImageLoading = () => {
  return (
    <Skeleton
      style={{
        width: '100%',
        height: '100%',
      }}
      animation='wave'
    />
  );
};

export const StyledCircleLoading = ({ color }: { color?: string }) => {
  const { theme } = useTheme();
  const initalScale = useSharedValue(1);
  const timingConfig = useMemo<WithTimingConfig>(
    () => ({
      duration: STYLES.DURATION.DURATION_1000,
      easing: Easing.linear,
    }),
    [],
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: initalScale.value,
      },
    ],
  }));

  useEffect(() => {
    initalScale.value = withRepeat(withTiming(1.5, timingConfig), -1, true);
  }, []);

  return (
    <Animated.View style={[animatedStyle]}>
      <ActivityIndicator animating color={color || theme.colors.orange} size='large' />
    </Animated.View>
  );
};

export const StyledRefreshControl = (props: RefreshControlProps) => {
  const { theme } = useTheme();
  return (
    <RefreshControl
      colors={[theme.colors.orange]}
      progressBackgroundColor={theme.colors.orange}
      tintColor={theme.colors.orange}
      title={i18n.t('other.refreshing')}
      titleColor={theme.colors.orange}
      {...props}
    />
  );
};

type BaseLoadingProps = {
  image: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  duration?: number;
};

export type BaseRotateLoadingProps = BaseLoadingProps & {
  rotateFrom?: number;
  rotateTo?: number;
  scaleTo?: number;
  scaleFrom?: number;
};

export const BaseRotateLoading = ({
  image,
  imageStyle = {},
  duration = STYLES.DURATION.DURATION_1000,
  rotateFrom = 0,
  rotateTo = 360,
  scaleFrom = 1,
  scaleTo = 1.4,
}: BaseRotateLoadingProps) => {
  const styles = useStyles();
  const initialRotate = useSharedValue(rotateFrom);
  const initialScale = useSharedValue(scaleFrom);
  const timingConfig = useMemo<WithTimingConfig>(
    () => ({
      duration,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    }),
    [],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${initialRotate.value}deg`,
      },
      {
        scale: initialScale.value,
      },
    ],
  }));

  useEffect(() => {
    initialRotate.value = withRepeat(withTiming(rotateTo, timingConfig), -1, true);
    initialScale.value = withRepeat(withTiming(scaleTo, timingConfig), -1, true);
  }, []);

  return <Animated.Image source={image} style={[styles.baseImage, imageStyle, animatedStyle]} />;
};

export const ChungCakeLoading = () => (
  <BaseRotateLoading image={require('../../assets/images/chung-cake.png')} />
);

export const BanhMiLoading = () => {
  return (
    <BaseRotateLoading
      image={require('../../assets/images/banh-mi.png')}
      rotateTo={-720}
      scaleTo={2}
    />
  );
};

export const GoiCuonLoading = () => {
  return (
    <BaseRotateLoading
      image={require('../../assets/images/goi-cuon.png')}
      rotateTo={360}
      scaleTo={2}
      duration={STYLES.DURATION.DURATION_2000}
    />
  );
};

export type BaseZicZacLoadingProps = BaseLoadingProps & {
  translateRatio?: number;
};

const calculateOffset = (size: number, ratio: number) => {
  return {
    start: size / 2 - ratio * size,
    end: size / 2 + ratio * size,
  };
};

export const BaseZicZacLoading = ({
  image,
  imageStyle = {},
  duration = STYLES.DURATION.DURATION_1000,
  translateRatio = 1,
}: BaseZicZacLoadingProps) => {
  const styles = useStyles();
  const { width, height } = styles.baseImage;
  const { start: startX, end: endX } = calculateOffset(width, translateRatio);
  const { start: startY, end: endY } = calculateOffset(height, translateRatio);
  const initialX = useSharedValue(startX);
  const initialY = useSharedValue(startY);
  const timingConfig = useMemo<WithTimingConfig>(
    () => ({
      duration,
      easing: Easing.bezier(0.25, -0.5, 0.25, 1),
    }),
    [],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: initialX.value,
      },
      {
        translateY: initialY.value,
      },
    ],
  }));

  useEffect(() => {
    initialX.value = withRepeat(
      withSequence(
        withTiming(endX, timingConfig),
        withTiming(startX, timingConfig),
        withTiming(endX, timingConfig),
        withTiming(startX, timingConfig),
      ),
      -1,
      true,
    );
    initialY.value = withRepeat(
      withSequence(
        withDelay(duration, withTiming(endY, timingConfig)),
        withTiming(endY, timingConfig),
        withTiming(startY, timingConfig),
      ),
      -1,
      true,
    );
  }, []);

  return <Animated.Image source={image} style={[styles.baseImage, imageStyle, animatedStyle]} />;
};

export const PhoLoading = () => (
  <BaseZicZacLoading image={require('../../assets/images/pho.png')} />
);

export const NoodleLoading = () => (
  <BaseZicZacLoading
    image={require('../../assets/images/noodle.png')}
    duration={STYLES.DURATION.DURATION_1000 / 2}
    translateRatio={0.5}
  />
);

// const loadings = [ChungCakeLoading, BanhMiLoading, GoiCuonLoading, NoodleLoading, PhoLoading];
const loadings = [ChungCakeLoading, BanhMiLoading, GoiCuonLoading];
export const RandomLoading = () => {
  const random = useMemo(() => Math.floor(Math.random() * loadings.length), []);
  return loadings[random]();
};

const useStyles = makeStyles(theme => {
  return {
    baseImage: {
      width: STYLES.ICON_SIZE.ICON_SIZE_24 * 2,
      height: STYLES.ICON_SIZE.ICON_SIZE_24 * 2,
    },
  };
});
