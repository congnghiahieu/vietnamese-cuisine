import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@rneui/themed';

type StyleSwitchProps = {
  active: boolean;
  onChange: (value: boolean) => void;
};

const StyledSwitch = ({ active, onChange }: StyleSwitchProps) => {
  const { theme } = useTheme();

  // value for Switch Animation
  const switchTranslate = useSharedValue(0);
  // Progress Value
  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0, {
      duration: 150,
      easing: Easing.inOut(Easing.quad),
    });
  });

  // useEffect for change the switchTranslate Value
  useEffect(() => {
    if (active) {
      switchTranslate.value = 22;
    } else {
      switchTranslate.value = 4;
    }
  }, [active, switchTranslate]);

  // Circle Animation
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(switchTranslate.value, {
            duration: 150,
            easing: Easing.inOut(Easing.quad),
          }),
        },
      ],
    };
  });
  // Background Color Animation
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 22],
      [theme.colors.blackGrey, theme.colors.orange],
    ),
  }));

  return (
    <TouchableWithoutFeedback onPress={() => onChange(!active)}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default StyledSwitch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
