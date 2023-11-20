import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { makeStyles } from '@rneui/themed';
import StyledImage from '@/components/Styled/StyledImage';
import { STYLES } from '@/lib/constants';

type StyledCarouselProps = {
  imageUrlList: string[];
  width: number;
  height: number;
};

const StyledCarousel = ({ imageUrlList, width, height }: StyledCarouselProps) => {
  const progressValue = useSharedValue<number>(0);

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <Carousel
        // mode='horizontal-stack'
        // autoPlay
        // autoPlayReverse
        // autoPlayInterval={2000}
        scrollAnimationDuration={STYLES.DURATION.DURATION_1000 / 2}
        loop
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) => {
          // console.log(absoluteProgress);
          progressValue.value = absoluteProgress;
        }}
        width={width}
        height={height}
        data={imageUrlList}
        renderItem={({ item }) => {
          return (
            <StyledImage
              source={{
                uri: item,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: (height / 11) * 10 - STYLES.MARGIN.MARGIN_16,
          flexDirection: 'row',
          alignSelf: 'center',
          gap: STYLES.GAP.GAP_4,
        }}>
        {imageUrlList.map((_, index) => {
          return (
            <PaginationItem
              key={index}
              index={index}
              length={imageUrlList.length}
              animatedValue={progressValue}
            />
          );
        })}
      </View>
    </View>
  );
};

type PaginationItemProps = {
  index: number;
  length: number;
  animatedValue: Animated.SharedValue<number>;
};
const circleSize = 8;
const PaginationItem = ({ index, length, animatedValue }: PaginationItemProps) => {
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

export default StyledCarousel;
