import { memo, useCallback, useState } from 'react';
import { ListRenderItem, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { makeStyles, normalize } from '@rneui/themed';
import StyledText from '@/components/Styled/StyledText';
import { SearchInput } from '@/components/Styled/StyledInput';
import StyledPressable from '@/components/Styled/StyledPressable';
import { StyledFlatList } from '@/components/Styled/StyledList';
import { ChevronRightIcon, HeartIcon, SearchIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { convertViToEn, hp, normalizeStr, removeAccents } from '@/lib/utils';
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
import { i18n } from '@/lib/i18n';

const useFoodListQuery = ({ email, filterKey = '' }: { email: string; filterKey: string }) =>
  useQuery<Food[]>({
    queryKey: ['food', 'list', email],
    queryFn: async () => {
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
        food =>
          ({
            ...food,
            loved: user.favouritedFoods.includes(food.title),
          } as Food),
      );
    },
    select: data => {
      if (!data) return [];
      if (!filterKey) return data;

      return data.filter(foodItem =>
        convertViToEn(foodItem.title).includes(convertViToEn(filterKey)),
      );
    },
  });

const Home = () => {
  const { user } = useAuth();
  const [searchKey, setSearchKey] = useState('');
  console.log('Home re-render');
  const styles = useStyles();
  const { data, isPending, refetch, isFetching } = useFoodListQuery({
    email: user?.email || '',
    filterKey: searchKey,
  });

  return (
    <View style={styles.container} onStartShouldSetResponder={dismissKeyboard}>
      <StyledText type='Heading_4' color='grey'>
        {i18n.t('home.find')}
      </StyledText>
      <SearchInput
        placeholder={i18n.t('home.search')}
        rightIcon={
          <StyledPressable style={styles.searchButton}>
            <SearchIcon />
          </StyledPressable>
        }
        value={searchKey}
        onChangeText={setSearchKey}
        disabled={isPending || isFetching}
      />
      {isPending ? (
        <LoadingView />
      ) : (
        <StyledFlatList
          emptyTitle={i18n.t('home.emptyList')}
          refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
          contentContainerStyle={{
            paddingHorizontal: 0,
            opacity: isFetching ? 0.4 : 1,
          }}
          keyExtractor={({ title }) => title}
          numColumns={2}
          columnWrapperStyle={styles.foodListColumn}
          initialNumToRender={data?.length}
          data={data}
          renderItem={RenderItem}
        />
      )}
    </View>
  );
};

const RenderItem: ListRenderItem<Food> = ({ item }) => <FoodCard {...item} />;

const FoodCard = memo(
  ({ title, imageUrlList, loved }: Food) => {
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
            text1: i18n.t('home.toast.warning'),
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
          queryKey: ['favourites'],
        });
        queryClient.resetQueries({
          queryKey: ['food', title],
        });
      },
      onError: err => {
        setLove(prev => !prev);
        console.log(err);
        StyledToast.show({
          type: 'error',
          text1: i18n.t('home.toast.error.text1', { title }),
          text2: i18n.t('home.toast.error.text2'),
        });
      },
    });

    const navigateToInformation = () =>
      router.push({
        pathname: '/(app)/information/[title]',
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
  },
  (prev, next) => prev.title === next.title && prev.loved === next.loved,
);

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
