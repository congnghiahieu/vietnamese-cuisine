import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { toRad } from 'react-native-redash';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

// @ts-ignore
export const createTransform = ({ x, y }, ...transformations) => {
  'worklet';
  return [{ translateX: x }, { translateY: y }, ...transformations];
};

type StyledHandleProps = BottomSheetHandleProps & {
  style?: StyleProp<ViewStyle>;
};

const StyledHandle = ({ style, animatedIndex }: StyledHandleProps) => {
  const styles = useStyles();

  const indicatorTransformOriginY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 1, 2], [-1, 0, 1], Extrapolate.CLAMP),
  );
  const containerStyle = useMemo(() => [styles.header, style], [style, styles]);
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(
      animatedIndex.value,
      [1, 2],
      [STYLES.RADIUS.RADIUS_20, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
    };
  });
  const leftIndicatorStyle = useMemo(
    () => ({
      ...styles.indicator,
      ...styles.leftIndicator,
    }),
    [styles],
  );
  const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const leftIndicatorRotate = interpolate(
      animatedIndex.value,
      [0, 1, 2],
      [toRad(-30), 0, toRad(30)],
      Extrapolate.CLAMP,
    );
    return {
      transform: createTransform(
        { x: 0, y: indicatorTransformOriginY.value },
        {
          rotate: `${leftIndicatorRotate}rad`,
        },
        {
          translateX: -4,
        },
      ),
    };
  });
  const rightIndicatorStyle = useMemo(
    () => ({
      ...styles.indicator,
      ...styles.rightIndicator,
    }),
    [styles],
  );
  const rightIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const rightIndicatorRotate = interpolate(
      animatedIndex.value,
      [0, 1, 2],
      [toRad(30), 0, toRad(-30)],
      Extrapolate.CLAMP,
    );
    return {
      transform: createTransform(
        { x: 0, y: indicatorTransformOriginY.value },
        {
          rotate: `${rightIndicatorRotate}rad`,
        },
        {
          translateX: 4,
        },
      ),
    };
  });

  return (
    <Animated.View
      style={[containerStyle, containerAnimatedStyle]}
      renderToHardwareTextureAndroid={true}>
      <Animated.View style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]} />
      <Animated.View style={[rightIndicatorStyle, rightIndicatorAnimatedStyle]} />
    </Animated.View>
  );
};

export default StyledHandle;

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    header: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      paddingVertical: STYLES.PADDING.PADDING_16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.whiteGrey,
    },
    indicator: {
      position: 'absolute',
      width: 10,
      height: 4,
      backgroundColor: dT ? theme.colors.white : theme.colors.black,
    },
    leftIndicator: {
      borderTopStartRadius: 2,
      borderTopEndRadius: 1,
      borderBottomStartRadius: 2,
      borderBottomEndRadius: 1,
    },
    rightIndicator: {
      borderTopStartRadius: 1,
      borderTopEndRadius: 2,
      borderBottomStartRadius: 1,
      borderBottomEndRadius: 2,
    },
  };
});
