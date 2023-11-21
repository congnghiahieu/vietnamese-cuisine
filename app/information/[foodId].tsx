import React, { useMemo, useState } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Slider, ListItem, makeStyles, useTheme } from '@rneui/themed';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AnimatedHandle, AnimatedHandleProps } from '@/components/Styled/BottomSheet/StyledHandle';
import StyledBackground, {
  StyledBackgroundProps,
} from '@/components/Styled/BottomSheet/StyledBackground';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledCarousel from '@/components/Styled/StyledCarousel';
import { SolidButton } from '@/components/Styled/StyledButton';
import { PlayCircleIcon, ChevronLeftIcon, HeartIcon, AudioControlIcon } from '@/components/Icon';
import { hp, wp } from '@/lib/utils';
import { STYLES } from '@/lib/constants';
import { ErrorView, LoadingView, SafeView } from '@/components/Styled/StyledView';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore';
import { useMutation, useQuery } from '@tanstack/react-query';
import StyledToast from '@/components/Styled/StyledToast';
import { useAuthStates } from '@/states/auth';
import { useAuth } from '@/context/AuthContext';

type FoodInformation = {
  foodId: string;
  imageUrlList: string[];
  title: string;
  subTitle: string;
  introduce: string;
  ingredientList: string[];
  steps: Step[];
  videoLink: string;
};

type Step = {
  title: string;
  content: string;
};

const Information = () => {
  const foodId = decodeURI(useLocalSearchParams<{ foodId: string }>().foodId);
  console.log(foodId);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['food', 'Phở'],
    queryFn: async () => {
      const docRef = doc(FIREBASE_DB, 'foods', 'Phở');
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error(`Information not available`);
      }
      return docSnap.data() as FoodInformation;
    },
  });

  let effect: React.ReactNode = null;

  if (isPending) {
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

type ImageSlideProps = {
  imageUrlList: string[];
};

const ImageSlide = ({ imageUrlList }: ImageSlideProps) => {
  const styles = useStyles();
  const router = useRouter();
  imageUrlList = [
    'https://media.cnn.com/api/v1/images/stellar/prod/170504142019-pho.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504152158-cha-ca.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504142339-banh-xeo.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/111005063013-vietnam-food-cao-lau.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170306134418-goi-cuon.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504151643-banh-knot.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504151239-bun-bo-nam-bo.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504150749-ga-nuong.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/160524100325-05-vietnam-dishes-xoi.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504150157-banh-cuon.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/160524092144-vietnam-street-food-bot-chien.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504145056-bun-cha.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170124150901-26-banh-mi.jpg?q=w_1110,c_fill/f_webp',
    'https://media.cnn.com/api/v1/images/stellar/prod/170504144408-banh-bao.jpg?q=w_1110,c_fill/f_webp',
  ];

  return (
    <View style={styles.imageSlideContainer}>
      <StyledPressable
        onPress={() => {
          router.back();
        }}
        style={styles.backButton}>
        <ChevronLeftIcon />
      </StyledPressable>
      <StyledCarousel imageUrlList={imageUrlList} width={wp(100)} height={hp(55)} />
    </View>
  );
};

const InformationBottomSheet = (props: FoodInformation) => {
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
}: FoodInformation) => {
  const styles = useStyles();
  const router = useRouter();
  const [love, setLove] = useState(false);
  const { user } = useAuth();

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
      const docRef = doc(FIREBASE_DB, 'users', user.email);
      await updateDoc(docRef, {
        favoriteFoods: love ? arrayRemove(title) : arrayUnion(title),
      });
    },
    onError: () => {
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
        <AudioControl />
        <StyledText type='Body' color='grey' style={{ textAlign: 'justify' }}>
          {introduce.replaceAll(/\s+/g, ' ')}
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

type StepListProps = {
  steps: Step[];
};

const StepList = ({ steps }: StepListProps) => {
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

const AudioControl = () => {
  const styles = useStyles();
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.audioControlContainer}>
      <StyledPressable onPress={() => setPlaying(prev => !prev)}>
        <AudioControlIcon active={playing} />
      </StyledPressable>
      <AudioSlider />
    </View>
  );
};

const AudioSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Slider
      value={sliderValue}
      onValueChange={setSliderValue}
      maximumValue={50}
      minimumValue={0}
      step={1}
      allowTouchTrack
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
