import { View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

type PaginationItemProps = {
  index: number;
  length: number;
  animatedValue: Animated.SharedValue<number>;
};
const circleSize = 8;
export const PaginationItem = ({ index, length, animatedValue }: PaginationItemProps) => {
  const styles = useStyles({
    circleSize,
  });
  const animatedStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-circleSize, 0, circleSize];

    if (index === 0 && animatedValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-circleSize, 0, circleSize];
    }

    return {
      transform: [
        {
          translateX: interpolate(animatedValue?.value, inputRange, outputRange, Extrapolate.CLAMP),
        },
      ],
    };
  }, [animatedValue, index, length]);

  return (
    <View style={styles.parentCircle}>
      <Animated.View style={[styles.childCircle, animatedStyle]} />
    </View>
  );
};

const useStyles = makeStyles(theme => {
  return {
    parentCircle: {
      backgroundColor: theme.colors.white,
      width: circleSize,
      height: circleSize,
      borderRadius: STYLES.RADIUS.RADIUS_50,
      overflow: 'hidden',
    },
    childCircle: {
      flex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_50,
      backgroundColor: theme.colors.orange,
    },
  };
});
