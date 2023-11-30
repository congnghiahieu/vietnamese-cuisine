import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Slider, ListItem, makeStyles, useTheme } from '@rneui/themed';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';
import * as Linking from 'expo-linking';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AnimatedHandle, AnimatedHandleProps } from '@/components/Styled/BottomSheet/StyledHandle';
import StyledBackground, {
  StyledBackgroundProps,
} from '@/components/Styled/BottomSheet/StyledBackground';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import { SolidButton } from '@/components/Styled/StyledButton';
import { PlayCircleIcon, ChevronLeftIcon, HeartIcon, AudioControlIcon } from '@/components/Icon';
import { hp, wp } from '@/lib/utils';
import { STYLES } from '@/lib/constants';
import { ErrorView, LoadingView } from '@/components/Styled/StyledView';
import { FIREBASE_DB } from '@/config/firebase';
import { doc, getDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import StyledToast from '@/components/Styled/StyledToast';
import { useAuth } from '@/context/AuthContext';
import StyledImage from '@/components/Styled/StyledImage';
import { PaginationItem } from '@/components/Styled/StyledCarousel';
import { Food, User } from '@/config/model';
import { useSound } from '@/hooks/useSound';

const useFoodQuery = ({ title, email }: { title: string; email: string }) =>
  useQuery<Food>({
    queryKey: ['food', title, email],
    queryFn: async () => {
      const docRef = doc(FIREBASE_DB, 'foods', title);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Information not available`);
      }
      let food = docSnap.data() as Food;
      if (!email) return food;
      const userRef = doc(FIREBASE_DB, 'users', email);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return food;

      const user = userDoc.data() as User;
      food.loved = user.favouritedFoods.includes(food.title);
      return food;
    },
  });

const Information = () => {
  console.log('Information re-render');
  const title = decodeURI(useLocalSearchParams<{ title: string }>().title);

  const { user } = useAuth();
  const { data, isPending, isError, error, isFetching } = useFoodQuery({
    title,
    email: user?.email || '',
  });

  let effect: React.ReactNode = null;
  if (isPending || isFetching) {
    effect = <LoadingView />;
  }
  if (isError) {
    effect = <ErrorView errorMessage={error.message} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      {effect || (
        <>
          <ImageSlide imageUrlList={data!.imageUrlList} />
          <InformationBottomSheet {...data!} />
        </>
      )}
    </View>
  );
};

const ImageSlide = ({ imageUrlList }: Pick<Food, 'imageUrlList'>) => {
  const styles = useStyles();
  const router = useRouter();
  const carouselWidth = wp(100);
  const carouselHeight = hp(55);
  const progressValue = useSharedValue<number>(0);

  return (
    <View style={styles.imageSlideContainer}>
      <StyledPressable
        onPress={() => {
          router.back();
        }}
        style={styles.backButton}>
        <ChevronLeftIcon />
      </StyledPressable>
      {/* Image Carousel*/}
      <View
        style={{
          position: 'relative',
        }}>
        <Carousel
          mode='horizontal-stack'
          modeConfig={{}}
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
          width={carouselWidth}
          height={carouselHeight}
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
            top: (carouselHeight / 11) * 10 - STYLES.MARGIN.MARGIN_16,
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
      {/* Image Carousel*/}
    </View>
  );
};

const InformationBottomSheet = (props: Food) => {
  const snapPoints = useMemo(() => ['50%', '70%', '90%'] as const, []);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      handleComponent={InformationBottomSheetHandle}
      backgroundComponent={InformationBottomSheetBackground}
      enablePanDownToClose={false}>
      <InformationBottomSheetBody {...props} />
    </BottomSheet>
  );
};

const InformationBottomSheetHandle = (props: AnimatedHandleProps) => {
  const bottomSheetstyles = useBottomSheetStyles();
  return <AnimatedHandle {...props} style={bottomSheetstyles.handle} />;
};

const InformationBottomSheetBackground = ({
  style: defaultStyle,
  ...otherProps
}: StyledBackgroundProps) => {
  const bottomSheetstyles = useBottomSheetStyles();
  return <StyledBackground style={[defaultStyle, bottomSheetstyles.background]} {...otherProps} />;
};

const useBottomSheetStyles = makeStyles(theme => {
  return {
    handle: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0,
    },
    background: {
      backgroundColor: theme.colors.background,
    },
  };
});

const InformationBottomSheetBody = ({
  title,
  subTitle,
  introduce,
  ingredientList,
  steps,
  videoLink,
  loved,
}: Food) => {
  const { user } = useAuth();
  const styles = useStyles();
  const router = useRouter();
  const [love, setLove] = useState(loved || false);
  const { playSound } = useSound(require('../../../assets/sound/love-sound.mp3'));
  const queryClient = useQueryClient();

  const loveMutation = useMutation({
    mutationFn: async () => {
      if (!user || !user?.email) {
        StyledToast.show({
          type: 'warning',
          text1: 'This action requires authentication',
        });
        router.push('/login');
        return;
      }
      setLove(prev => !prev);
      if (!love) {
        playSound();
      }
      const docRef = doc(FIREBASE_DB, 'users', user.email);
      await updateDoc(docRef, {
        favouritedFoods: love ? arrayRemove(title) : arrayUnion(title),
      });
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['food', 'list'],
      });
      queryClient.resetQueries({
        queryKey: ['favourites', user?.email],
      });
    },
    onError: () => {
      setLove(prev => !prev);
      StyledToast.show({
        type: 'error',
        text1: `Fail to love ${title}`,
        text2: 'Please try again',
      });
    },
  });

  return (
    <BottomSheetScrollView contentContainerStyle={styles.body}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <StyledText type='Heading_2' color='orange'>
            {title}
          </StyledText>
          <StyledText type='Body' color='grey'>
            {subTitle}
          </StyledText>
        </View>
        <StyledPressable onPress={() => loveMutation.mutate()}>
          <HeartIcon active={love} />
        </StyledPressable>
      </View>
      <View style={styles.story}>
        <StyledText type='Heading_3' color='orange'>
          Story
        </StyledText>
        <AudioControl introduce={introduce} />
        <StyledText type='Body' color='grey' style={{ textAlign: 'justify' }}>
          {introduce}
        </StyledText>
      </View>
      <View>
        <StyledText type='Heading_3' color='orange'>
          Ingredients
        </StyledText>
        <IngredientList ingredients={ingredientList} />
      </View>
      <View>
        <StyledText type='Heading_3' color='orange'>
          Steps
        </StyledText>
        <StepList steps={steps} />
      </View>
      <SolidButton
        title='How to make Pho'
        icon={<PlayCircleIcon />}
        iconPosition='right'
        containerStyle={{
          marginBottom: STYLES.MARGIN.MARGIN_32,
          borderRadius: STYLES.RADIUS.RADIUS_10,
        }}
        buttonStyle={{
          paddingVertical: STYLES.PADDING.PADDING_16,
        }}
        onPress={() => {
          Linking.openURL(videoLink);
        }}
      />
    </BottomSheetScrollView>
  );
};

type IngredientListProps = {
  ingredients: string[];
};

const IngredientList = ({ ingredients }: IngredientListProps) => {
  const styles = useStyles();
  const splitPoint = Math.ceil(ingredients.length / 2);
  const ingredientList_1 = ingredients.slice(0, splitPoint);
  const ingredientList_2 = ingredients.slice(splitPoint);

  return (
    <View style={styles.ingredientList}>
      <IngredientSubList ingredients={ingredientList_1} />
      <IngredientSubList ingredients={ingredientList_2} />
    </View>
  );
};

const IngredientSubList = ({ ingredients }: IngredientListProps) => {
  return (
    <View style={{ flex: 1 }}>
      {ingredients.map((ingredient, index) => (
        <ListItem
          key={`${ingredient}-${index}`}
          containerStyle={{
            paddingVertical: STYLES.PADDING.PADDING_4,
          }}>
          <ListItem.Content>
            <StyledText type='Body' color='grey'>
              {ingredient}
            </StyledText>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

const StepList = ({ steps }: Pick<Food, 'steps'>) => {
  return (
    <View>
      {steps.map(step => (
        <ListItem key={step.title}>
          <ListItem.Content>
            <StyledText type='Heading_4' color='blackGrey'>
              {step.title}
            </StyledText>
            <StyledText type='Body' color='grey' style={{ textAlign: 'justify' }}>
              {step.content}
            </StyledText>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

// 711 character ~ rate 1 ~ 47413 milliseconds ~ 48 seconds => WORD_PER_SECOND_PER_RATE = 14.8125 ~ 15

// 248 word ~ rate 1 ~ 74761 ms => WORD_PER_SECOND_PER_RATE = 3.3172
// 155 word ~ rate 1 ~ 47327 ms => WORD_PER_SECOND_PER_RATE = 3.2750
// 71 word ~ rate 1 ~ 21214 ms => WORD_PER_SECOND_PER_RATE = 3.3468
// 82 word ~ rate 1 ~ 24995 ms => WORD_PER_SECOND_PER_RATE = 3.2806
// 91 word ~ rate 1 ~ 28024 ms => WORD_PER_SECOND_PER_RATE = 3.2472
// 207 word ~ rate 1 ~ 65827 ms => WORD_PER_SECOND_PER_RATE = 3.1446
// 112 word ~ rate 1 ~ 36813 ms => WORD_PER_SECOND_PER_RATE = 3.0424
// 191 word ~ rate 1 ~ 65228 ms => WORD_PER_SECOND_PER_RATE = 2.9281

const WORD_PER_SECOND_PER_RATE = 3.4;
const calculateSpeakPeriodBySeconds = ({
  wordCount,
  speedRate = 1,
}: {
  wordCount: number;
  speedRate?: number;
}) => {
  const period = Math.floor(wordCount / (WORD_PER_SECOND_PER_RATE * speedRate));
  return {
    start: 1,
    end: 1 + period,
  };
};

const AudioControl = ({ introduce }: Pick<Food, 'introduce'>) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const speechSpeedRate = 1;
  const { start, end } = useMemo(
    () =>
      calculateSpeakPeriodBySeconds({
        wordCount: introduce.split(' ').length,
        speedRate: speechSpeedRate,
      }),
    [],
  );
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(start);
  const intervalId = useRef<any>(null);
  // const startRef = useRef<number>();
  // const endRef = useRef<number>();

  const handleSpeech = async () => {
    const voiceList = await Speech.getAvailableVoicesAsync();
    // console.log(voiceList.length);
    const vietnamVoice = voiceList.find(voice => {
      // console.log(`${voice.language}: ${voice.name} : ${voice.identifier}`);
      return voice.language.includes('vi');
    });
    const vietnamVoiceId = 'com.apple.voice.compact.vi-VN.Linh';
    const englishVoiceId = 'com.apple.ttsbundle.siri_Martha_en-GB_compact';

    const alreadyPlay = await Speech.isSpeakingAsync();
    if (!alreadyPlay) {
      Speech.speak(introduce, {
        language: 'vi',
        pitch: 1,
        rate: speechSpeedRate,
        voice: vietnamVoiceId,
        onStart: () => {
          // console.log('Rate:', 1);
          // console.log('Paragraph length:', introduce.split(' ').length);
          // startRef.current = Date.now();
          // console.log('Start at:', startRef.current);
          // console.log('Started');
        },
        onDone: () => {
          // endRef.current = Date.now();
          // const long = endRef.current - startRef.current!;
          // console.log('Long:', long, 'milliseconds');
          // console.log('Long: ', Math.round(long / 1000), 'seconds');
          clearInterval(intervalId.current);
          intervalId.current = null;
          setPlaying(false);
          setSliderValue(1);
        },
      });
      setPlaying(true);
    } else if (alreadyPlay && playing) {
      await Speech.pause();
      setPlaying(false);
    } else {
      await Speech.resume();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (playing) {
      intervalId.current = setInterval(() => {
        setSliderValue(prev => prev + 1);
      }, 1000);
    } else if (!playing && intervalId != null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, [playing]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, []),
  );

  return (
    <View style={styles.audioControlContainer}>
      <StyledPressable onPress={() => handleSpeech()}>
        <AudioControlIcon active={playing} />
      </StyledPressable>
      <Slider
        value={sliderValue}
        minimumValue={start}
        maximumValue={end}
        step={1}
        // allowTouchTrack
        orientation='horizontal'
        minimumTrackTintColor={theme.colors.orange}
        maximumTrackTintColor={theme.colors.whiteGrey}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        thumbTouchSize={{
          width: STYLES.ICON_SIZE.ICON_SIZE_24,
          height: STYLES.ICON_SIZE.ICON_SIZE_24,
        }}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    imageSlideContainer: {
      position: 'relative',
      // zIndex: 1,
    },
    backButton: {
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      // backgroundColor: 'red',
      position: 'absolute',
      ...Platform.select<{ top: number; left: number }>({
        android: {
          top: STYLES.MARGIN.MARGIN_8,
          left: STYLES.MARGIN.MARGIN_8,
        },
        ios: {
          top: STYLES.MARGIN.MARGIN_24,
          left: STYLES.MARGIN.MARGIN_16,
        },
      }),
      zIndex: 2,
      borderRadius: STYLES.RADIUS.RADIUS_50,
    },
    // image: {
    //   width: '100%',
    //   height: hp(55),
    //   zIndex: 1,
    // },
    body: {
      // flex: 1,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      // marginTop: STYLES.MARGIN.MARGIN_8,
      gap: STYLES.GAP.GAP_16,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    header: {},
    story: {
      gap: STYLES.GAP.GAP_16,
    },
    audioControlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: STYLES.PADDING.PADDING_8,
      paddingVertical: STYLES.PADDING.PADDING_4,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_4 : STYLES.SHADOW.SHADOW_BLACK_4),
    },
    track: {
      height: 2,
      backgroundColor: theme.colors.orange,
      color: theme.colors.orange,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: theme.colors.orange,
    },
    ingredientList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  };
});

export default Information;
