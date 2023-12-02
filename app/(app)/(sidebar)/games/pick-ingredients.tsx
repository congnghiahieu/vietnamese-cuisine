import { useEffect, useRef, useState } from 'react';
import { Alert, ImageSourcePropType, View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { GameHeaderRight } from '@/components/Styled/StyledHeader';
import { makeStyles, useTheme } from '@rneui/themed';
import { hp, shuffleArray, wp } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';
import StyledImage from '@/components/Styled/StyledImage';
import StyledText from '@/components/Styled/StyledText';
import { STYLES } from '@/lib/constants';
import StyledDivider from '@/components/Styled/StyledDivider';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { CircleCheckIcon, LifeIcon } from '@/components/Icon';
import { i18n } from '@/lib/i18n';

const MAX_LIFE = 10;

type ChoiceItem = {
  imageSource: ImageSourcePropType;
  isCorrectChoice: boolean;
};

type Question = {
  food: string;
  foodImage: ImageSourcePropType;
  choices: ChoiceItem[];
};

type GameChoiceItem = ChoiceItem & {
  isDiscover: boolean;
};

type GameQuestion = Omit<Question, 'choices'> & {
  choices: GameChoiceItem[];
};

// Each question has 8 choices
const QUESTIONS: Question[] = [
  {
    food: 'Phở',
    foodImage: require('../../../../assets/images/pick-ingredients/pho.jpg'),
    choices: [
      {
        imageSource: require('../../../../assets/images/pick-ingredients/dinh-huong.jpg'),
        isCorrectChoice: false,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/hanh-tay.jpg'),
        isCorrectChoice: true,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/que.jpg'),
        isCorrectChoice: false,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/thao-qua.jpg'),
        isCorrectChoice: true,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/duong-cat.webp'),
        isCorrectChoice: false,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/gung.webp'),
        isCorrectChoice: false,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/thit-bo.webp'),
        isCorrectChoice: false,
      },
      {
        imageSource: require('../../../../assets/images/pick-ingredients/xuong-lon.webp'),
        isCorrectChoice: false,
      },
    ],
  },
];

// Absoluate x,y width, height respect to Window
type RectAbsoluteLayout = {
  absX: number;
  absY: number;
  width: number;
  height: number;
};

type PointerOffset = {
  pointerX: number;
  pointerY: number;
};

const getRandomQuestion = () => {
  const shuffled = shuffleArray(QUESTIONS)[0];
  return {
    ...shuffled,
    choices: shuffled.choices.map(choice => ({
      ...choice,
      isDiscover: false,
    })),
  };
};

const PickIngredients = () => {
  const [soundOn, setSoundOn] = useState(true);
  const styles = useStyles();
  const router = useRouter();
  const { theme } = useTheme();
  const [question, setQuestion] = useState<GameQuestion>(getRandomQuestion());
  const [currentLife, setCurrentLife] = useState(MAX_LIFE);
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [dropAreaRect, setDropAreaRect] = useState<RectAbsoluteLayout>({
    absX: 0,
    absY: 0,
    width: 0,
    height: 0,
  });
  const foodContainerRef = useRef<View>(null);

  const checkInDropZone = ({ pointerX, pointerY }: PointerOffset) => {
    const isInDropZoneX =
      dropAreaRect.absX < pointerX && pointerX < dropAreaRect.absX + dropAreaRect.width;
    const isInDropZoneY =
      dropAreaRect.absY < pointerY && pointerY < dropAreaRect.absY + dropAreaRect.height;
    return isInDropZoneX && isInDropZoneY;
  };

  const onChoiceDrop = ({
    pointerX,
    pointerY,
    choiceId,
  }: PointerOffset & {
    choiceId: number;
  }) => {
    // console.log(`Range X: (${dropAreaRect.absX}, ${dropAreaRect.absX + dropAreaRect.width})`);
    // console.log(`Range Y: (${dropAreaRect.absY}, ${dropAreaRect.absY + dropAreaRect.height})`);
    // console.log(`Pointer: (${pointerX}, ${pointerY})`);
    const isInDropZone = checkInDropZone({ pointerX, pointerY });

    if (!isInDropZone) return;

    if (!question.choices[choiceId].isCorrectChoice) {
      if (soundOn) {
        playWrongSound();
      }
      setCurrentLife(prev => (prev > 0 ? prev - 1 : 0));
      return;
    }

    if (soundOn) playCorrectSound();
    setQuestion(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.choices[choiceId].isDiscover = true;
      return copy;
    });
  };

  const reset = () => {
    setQuestion(getRandomQuestion());
    setCurrentLife(MAX_LIFE);
  };
  const { playSound: playCorrectSound } = useSound(
    require('../../../../assets/sound/correct-answer-sound.mp3'),
  );
  const { playSound: playWrongSound } = useSound(
    require('../../../../assets/sound/wrong-answer-sound.wav'),
  );

  useEffect(() => {
    if (currentLife == 0) {
      Alert.alert(
        i18n.t('games.lose'),
        i18n.t('games.wannaPlayAgain'),
        [
          {
            isPreferred: false,
            onPress: () => router.back(),
            style: 'destructive',
            text: i18n.t('games.quit'),
          },
          {
            isPreferred: true,
            onPress: reset,
            style: 'default',
            text: i18n.t('games.retry'),
          },
        ],
        {
          cancelable: false,
          userInterfaceStyle: theme.mode === 'dark' ? 'dark' : 'light',
        },
      );
    }
  }, [currentLife]);

  useEffect(() => {
    if (
      question.choices.every(
        choice => !choice.isCorrectChoice || (choice.isCorrectChoice && choice.isDiscover),
      )
    ) {
      Alert.alert(
        i18n.t('games.win'),
        i18n.t('games.wannaPlayAgain'),
        [
          {
            isPreferred: false,
            onPress: () => router.back(),
            style: 'destructive',
            text: i18n.t('games.quit'),
          },
          {
            isPreferred: true,
            onPress: reset,
            style: 'default',
            text: i18n.t('games.playAgain'),
          },
        ],
        {
          cancelable: false,
          userInterfaceStyle: theme.mode === 'dark' ? 'dark' : 'light',
        },
      );
    }
  }, [question]);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <GameHeaderRight
              soundOn={soundOn}
              onSoundPress={() => setSoundOn(prev => !prev)}
              onResetPress={reset}
            />
          ),
          headerTitle: () => {
            return (
              <View style={styles.lifeContainer}>
                <StyledText type='Heading_4' color='orange'>
                  {currentLife}
                </StyledText>
                <LifeIcon />
              </View>
            );
          },
        }}
      />
      <StyledDivider orientation='horizontal' />
      <View style={styles.gameContainer}>
        <View style={styles.choiceList}>
          {question.choices.map((_, i, choices) => {
            if (i % 2 === 1) return null;

            return (
              <View style={styles.choiceRow} key={i}>
                {[choices[i], choices[i + 1]].map((choice, j) => {
                  return (
                    <Choice
                      {...choice}
                      key={`${i}${j}`}
                      onChoiceDrop={({ pointerX, pointerY }) =>
                        onChoiceDrop({
                          pointerX,
                          pointerY,
                          choiceId: i + j,
                        })
                      }
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
        <View
          ref={foodContainerRef}
          style={styles.foodContainer}
          // onLayout={e => {
          //   setDropAreaRect(e.nativeEvent.layout);
          // }}
          onLayout={e => {
            foodContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
              setDropAreaRect({
                absX: pageX,
                absY: pageY,
                width,
                height,
              });
            });
          }}>
          <StyledText type='Heading_3' color='orange'>
            {question.food}
          </StyledText>
          <Animated.View style={[styles.foodImageContainer]}>
            <StyledImage style={styles.image} source={question.foodImage} />
          </Animated.View>
        </View>
      </View>
    </>
  );
};

type ChoiceProps = GameChoiceItem & {
  onChoiceDrop: (arg: PointerOffset) => void;
};

const Choice = ({ imageSource, isDiscover, onChoiceDrop }: ChoiceProps) => {
  const styles = useStyles();
  const panning = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(e => {
      panning.value = true;
    })
    .onChange(e => {
      x.value = e.translationX;
      y.value = e.translationY;
    })
    .onFinalize(e => {
      panning.value = false;

      onChoiceDrop({
        pointerX: e.absoluteX,
        pointerY: e.absoluteY,
      });

      x.value = withSpring(0);
      y.value = withSpring(0);
    })
    .runOnJS(true)
    .enabled(!isDiscover);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: x.value,
      },
      {
        translateY: y.value,
      },
    ],
    opacity: withTiming(panning.value ? 0.7 : 1, {
      duration: 300,
    }),
    zIndex: panning.value ? 10 : 1,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.choiceContainer, animatedStyles]}>
        {isDiscover && (
          <View style={styles.discoveredChoiceOverlay}>
            <CircleCheckIcon />
          </View>
        )}
        <StyledImage style={styles.image} source={imageSource} />
      </Animated.View>
    </GestureDetector>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  return {
    lifeContainer: {
      gap: STYLES.GAP.GAP_4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    gameContainer: {
      flex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      backgroundColor: dT ? theme.colors.background : theme.colors.white,
    },
    choiceList: {
      gap: STYLES.GAP.GAP_16,
      paddingHorizontal: STYLES.PADDING.PADDING_8,
      marginTop: STYLES.MARGIN.MARGIN_8,
      zIndex: 1, // works on ios
      elevation: 1, // works on android
    },
    choiceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_16,
    },
    choiceContainer: {
      flex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: 'white',
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_4 : STYLES.SHADOW.SHADOW_BLACK_4),
      width: '100%',
      height: hp(12),
    },
    discoveredChoiceOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
      backgroundColor: '#ffffff99',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
    foodContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      marginTop: STYLES.MARGIN.MARGIN_8,
      zIndex: 0, // works on ios
      elevation: 0, // works on android
      // backgroundColor: 'black',
    },
    foodImageContainer: {
      width: wp(70),
      height: hp(22),
      backgroundColor: 'white',
      ...STYLES.SHADOW.SHADOW_ORANGE_12,
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
  };
});

export default PickIngredients;
