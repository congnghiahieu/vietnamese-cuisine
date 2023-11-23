import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import StyledText from '@/components/Styled/StyledText';
import { SearchInput } from '@/components/Styled/StyledInput';
import StyledPressable from '@/components/Styled/StyledPressable';
import { StyledFlatList } from '@/components/Styled/StyledList';
import { ChevronRightIcon, HeartIcon, SearchIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { hp } from '@/lib/utils';
import StyledImage from '@/components/Styled/StyledImage';
import { FIREBASE_DB } from '@/config/firebase';
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { dismissKeyboard } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingView } from '@/components/Styled/StyledView';
import { StyledRefreshControl } from '@/components/Styled/StyledLoading';
import StyledToast from '@/components/Styled/StyledToast';
import { useAuth } from '@/context/AuthContext';
import { Food, User } from '@/config/model';
import { useSound } from '@/hooks/useSound';

const useFoodListQuery = (email: string) =>
  useQuery<Food[]>({
    queryKey: ['food', 'list', email],
    queryFn: async () => {
      console.log(email);
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'foods'));
      let foodList = querySnapshot.docs.map(doc => doc.data()) as Food[];
      if (!email) {
        return foodList;
      }
      const docRef = doc(FIREBASE_DB, 'users', email);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) return foodList;

      const user = userDoc.data() as User;

      return foodList.map(
        food => ({ ...food, loved: user.favouritedFoods.includes(food.title) } as Food),
      );
    },
  });

const Home = () => {
  console.log('Home re-render');
  const styles = useStyles();

  const { user } = useAuth();
  const { data, isPending, refetch, isFetching } = useFoodListQuery(user?.email || '');

  return (
    <View style={styles.container} onStartShouldSetResponder={dismissKeyboard}>
      <View>
        <StyledText type='Heading_4' color='grey'>
          Let's find your favourite {'\n'}
          Vietnamese food
        </StyledText>
      </View>
      <SearchInput
        placeholder='Search'
        rightIcon={
          <StyledPressable style={styles.searchButton}>
            <SearchIcon />
          </StyledPressable>
        }
      />
      {isPending ? (
        <LoadingView />
      ) : (
        <StyledFlatList
          emptyTitle='No dish available!'
          refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
          contentContainerStyle={{
            paddingHorizontal: 0,
            opacity: isFetching ? 0.4 : 1,
          }}
          keyExtractor={({ title }) => title}
          numColumns={2}
          columnWrapperStyle={styles.foodListColumn}
          data={data}
          renderItem={({ item }) => <FoodCard {...item} />}
        />
      )}
    </View>
  );
};

const FoodCard = ({ title, imageUrlList, loved }: Food) => {
  const styles = useStyles();
  const router = useRouter();
  const { user } = useAuth();
  const [love, setLove] = useState(loved || false);
  const { playSound } = useSound(require('../../assets/sound/love-sound.mp3'));
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
        queryKey: ['food', title],
      });
      queryClient.resetQueries({
        queryKey: ['favourite', user?.email],
      });
    },
    onError: err => {
      setLove(prev => !prev);
      console.log(err);
      StyledToast.show({
        type: 'error',
        text1: `Fail to love ${title}`,
        text2: 'Please try again',
      });
    },
  });

  const navigateToInformation = () =>
    router.push({
      pathname: '/information/[title]',
      params: { title },
    });

  return (
    <View style={styles.card}>
      <StyledImage
        source={{
          uri: imageUrlList[0],
        }}
        style={styles.cardImage}
        onPress={navigateToInformation}
      />
      <StyledPressable onPress={() => loveMutation.mutate()} style={styles.cardLoveButton}>
        <HeartIcon active={love} />
      </StyledPressable>
      <View style={styles.cardFooter}>
        <StyledText type='Heading_5' color='white' lengthLimit={12}>
          {title}
        </StyledText>
        <StyledPressable style={styles.redirectButton} onPress={navigateToInformation}>
          <ChevronRightIcon />
        </StyledPressable>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  return {
    container: {
      flex: 1,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      gap: STYLES.GAP.GAP_16,
    },
    searchButton: {
      backgroundColor: dT ? 'rgba(255, 255, 255, 0.2)' : '#eee',
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
    redirectButton: {
      backgroundColor: theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_50,
    },
    foodListColumn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flexBasis: '49%',
      height: hp(40),
      position: 'relative',
      borderRadius: STYLES.RADIUS.RADIUS_10,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    cardImage: {
      zIndex: 0,
      width: '100%',
      height: '100%',
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
    cardLoveButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: STYLES.MARGIN.MARGIN_4,
      zIndex: 1,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: STYLES.MARGIN.MARGIN_4,
      zIndex: 1,
    },
  };
});

export default Home;
