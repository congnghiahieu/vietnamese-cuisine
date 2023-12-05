import { useEffect, useRef, useState } from 'react';
import { Alert, ImageSourcePropType, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { GameHeaderRight } from '@/components/Styled/StyledHeader';
import StyledImage from '@/components/Styled/StyledImage';
import { makeStyles, useTheme } from '@rneui/themed';
import StyledText from '@/components/Styled/StyledText';
import { LifeIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { StyledFlatList } from '@/components/Styled/StyledList';
import StyledPressable from '@/components/Styled/StyledPressable';
import { hp, shuffleArray, wp } from '@/lib/utils';
import { i18n } from '@/lib/i18n';
import { useSound } from '@/hooks/useSound';
import StyledDivider from '@/components/Styled/StyledDivider';

const MAX_LIFE = 3;
const THROTTLE_TIME = 1500;
type Question = {
  image: ImageSourcePropType;
  question: string;
  answers: Record<string, boolean>;
};
const QUESTIONS: Question[] = [
  {
    image: require('../../../../assets/images/guess-food/che.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/com-chay.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/banh-mi.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bun-cha.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/com-suon-nuong.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/banh-goi.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bun-dau-mam-tom.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bot-chien.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/ca-tim-kho-to.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/banh-cuon.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/xoi-xeo.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bo-nuong-la-lot.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/ca-phe-trung.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/pho-xao.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/ga-nuong.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/pho-cuon.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bun-bo-nam-bo.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/nom-hoa-chuoi.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/ga-tan.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/banh-khot.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/bun-bo-hue.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/nem-ran.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/goi-cuon.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/cao-lau.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/banh-xeo.jpeg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/pho.jpg'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
  {
    image: require('../../../../assets/images/guess-food/cha-ca.webp'),
    question: "What's dish",
    answers: {
      'Phở': false,
      'Bánh mì': false,
      'Bánh cuốn': false,
      'Bánh khọt': true,
    },
  },
];

const GuessFood = () => {
  const styles = useStyles();
  const router = useRouter();
  const { theme } = useTheme();
  const [soundOn, setSoundOn] = useState(true);
  const [questions, setQuestions] = useState(shuffleArray(QUESTIONS));
  const [currentLife, setCurrentLife] = useState(MAX_LIFE);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const previousAnswerTime = useRef(0);
  const reset = () => {
    setQuestions(shuffleArray(QUESTIONS));
    setCurrentLife(MAX_LIFE);
    setCurrentQuestion(0);
    previousAnswerTime.current = 0;
  };
  const { playSound: playCorrectSound } = useSound(
    require('../../../../assets/sound/correct-answer-sound.mp3'),
  );
  const { playSound: playWrongSound } = useSound(
    require('../../../../assets/sound/wrong-answer-sound.wav'),
  );

  const handleAnswer = (isCorrectAnswer: boolean) => {
    if (!isCorrectAnswer) {
      if (soundOn) {
        playWrongSound();
      }
      setCurrentLife(prev => (prev > 0 ? prev - 1 : 0));
      return;
    }

    if (soundOn) {
      playCorrectSound();
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentQuestion === questions.length - 1) {
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
  };

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
        <View style={styles.imageContainer}>
          <StyledImage source={questions[currentQuestion].image} style={styles.image} />
        </View>
        <StyledText
          type='Heading_3'
          color='blackGrey'
          style={{
            textAlign: 'center',
          }}>
          {/* {questions[currentQuestion].question} */}
          {i18n.t('games.guessFood.whatDish')}
        </StyledText>
        <StyledFlatList
          scrollEnabled={false}
          emptyTitle=''
          initialNumToRender={Object.keys(questions[currentQuestion].answers).length}
          data={Object.keys(questions[currentQuestion].answers)}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            return (
              <StyledPressable
                style={styles.answerContainer}
                onPress={() => {
                  if (Date.now() - previousAnswerTime.current < THROTTLE_TIME) return;

                  previousAnswerTime.current = Date.now();
                  handleAnswer(questions[currentQuestion].answers[item]);
                }}>
                <StyledText type='Heading_4' color='white'>
                  {item}
                </StyledText>
              </StyledPressable>
            );
          }}
          numColumns={2}
          columnWrapperStyle={styles.answerColumn}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </>
  );
};

export default GuessFood;

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
      gap: STYLES.GAP.GAP_16,
      marginTop: STYLES.MARGIN.MARGIN_16,
    },
    imageContainer: {
      width: wp(100),
      height: hp(50),
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: 'white',
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
    answerColumn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_16,
    },
    answerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: STYLES.PADDING.PADDING_16,
      backgroundColor: theme.colors.orange,
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
    separator: {
      marginTop: STYLES.MARGIN.MARGIN_24,
    },
  };
});
