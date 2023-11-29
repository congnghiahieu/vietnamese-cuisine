import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledImage from '@/components/Styled/StyledImage';
import StyledText from '@/components/Styled/StyledText';
import { RefObject, useCallback, useRef } from 'react';
import { ArrowRightIcon } from '@/components/Icon';
import { wp } from '@/lib/utils';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { LIGHT_COLORS, DARK_COLORS, STYLES } from '@/lib/constants';
import { useRouter } from 'expo-router';

type OnboardItem = {
  title: string;
  imageSource: ImageSourcePropType;
  color: string;
};

const onboardList: OnboardItem[] = [
  {
    title: 'Greeting,\nVietnamese Cuisine here',
    imageSource: require('../../assets/images/onboard/banh-mi.jpeg'),
    color: LIGHT_COLORS.redPink,
  },
  {
    title: 'You wanna find our \nmore about Vietnam?',
    imageSource: require('../../assets/images/onboard/bun-cha-1.jpg'),
    color: DARK_COLORS.yellow,
  },
  {
    title: 'Discover Vietnamese \nthrough tasty foods',
    imageSource: require('../../assets/images/onboard/spring-roll-1.webp'),
    color: '#9ADE7B',
  },
  {
    title: "What're you waiting for?\nLet's explore now",
    imageSource: require('../../assets/images/onboard/pho-3.jpg'),
    color: LIGHT_COLORS.orange,
  },
];

const Onboard = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardItem>>();
  const flatListX = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems && viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    {
      onViewableItemsChanged,
      viewabilityConfig: {
        minimumViewTime: 300,
        viewAreaCoveragePercentThreshold: 10,
      },
    },
  ]);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      flatListX.value = event.contentOffset.x;
    },
  });

  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <Animated.FlatList
          // @ts-ignore
          ref={flatListRef}
          onScroll={onScroll}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          data={onboardList}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <StyledImage source={item.imageSource} style={styles.image} />
                <StyledText type='Heading_3' style={[styles.title, { color: item.color }]}>
                  {item.title}
                </StyledText>
              </View>
            );
          }}
          keyExtractor={({ title }) => title}
          horizontal
          scrollEventThrottle={16}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.pagination}>
            {Array(onboardList.length)
              .fill(0)
              .map((_, index) => {
                return <Dot index={index} x={flatListX} key={index} />;
              })}
          </View>
          <CustomButton
            dataLength={onboardList.length}
            flatListIndex={flatListIndex}
            flatListRef={flatListRef}
            x={flatListX}
          />
        </View>
      </View>
    </>
  );
};

const useAnimatedColor = ({ x }: { x: SharedValue<number> }) => {
  const SCREEN_WIDTH = wp(100);
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      onboardList.map((_, i) => i * SCREEN_WIDTH),
      onboardList.map(item => item.color),
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return animatedColor;
};

type DotProps = {
  index: number;
  x: SharedValue<number>;
};

const Dot = ({ index, x }: DotProps) => {
  const SCREEN_WIDTH = wp(100);
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [10, 20, 10],
      Extrapolate.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  const animatedColor = useAnimatedColor({
    x,
  });

  return <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />;
};

type CustomButtonProps = {
  dataLength: number;
  x: SharedValue<number>;
  flatListIndex: SharedValue<number>;
  flatListRef: RefObject<FlatList<OnboardItem>>;
};

const CustomButton = ({ flatListRef, flatListIndex, dataLength, x }: CustomButtonProps) => {
  const router = useRouter();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
        },
      ],
    };
  });
  const animatedColor = useAnimatedColor({
    x,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
          return;
        }
        // AsyncStorage.setItem('Vietnamese Cuisine Onboard', 'true');
        router.push('/(sidebar)/');
      }}>
      <Animated.View style={[styles.buttonContainer, buttonAnimationStyle, animatedColor]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>Get Started</Animated.Text>
        <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
          <ArrowRightIcon />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: wp(100),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    position: 'absolute',
    top: STYLES.MARGIN.MARGIN_48,
    left: STYLES.MARGIN.MARGIN_16,
    right: STYLES.MARGIN.MARGIN_16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: STYLES.MARGIN.MARGIN_48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: STYLES.MARGIN.MARGIN_16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  dot: {
    height: 10,
    marginHorizontal: STYLES.MARGIN.MARGIN_8,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    ...TEXT_STYLE_TYPE_MAP.Body,
    color: '#fff',
  },
});
