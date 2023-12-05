import { ListRenderItem, View } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { arrayRemove, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import StyledText from '@/components/Styled/StyledText';
import { EmptyList, StyledFlatList } from '@/components/Styled/StyledList';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ChevronRightIcon, HeartDislikeIcon } from '@/components/Icon';
import StyledImage from '@/components/Styled/StyledImage';
import { FIREBASE_DB } from '@/config/firebase';
import { StyledRefreshControl } from '@/components/Styled/StyledLoading';
import { LoadingView } from '@/components/Styled/StyledView';
import { useAuth } from '@/context/AuthContext';

import { hp } from '@/lib/utils';
import { Food } from '@/config/model';
import { STYLES } from '@/lib/constants';
import { i18n } from '@/lib/i18n';
import StyledToast from '@/components/Styled/StyledToast';
import { memo } from 'react';

const useFavouriteQuery = (email: string) =>
  useQuery<Food[]>({
    queryKey: ['favourites', email],
    queryFn: async () => {
      if (!email) return [];

      const userRef = doc(FIREBASE_DB, 'users', email);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return [];

      const favouriteTitleList: string[] = userSnap.data()?.favouritedFoods || [];
      const favouriteFoodList = await Promise.all(
        favouriteTitleList.map(async title => {
          const foodRef = doc(FIREBASE_DB, 'foods', title);
          const foodSnap = await getDoc(foodRef);
          if (!foodSnap.exists()) return undefined;
          return foodSnap.data() as Food;
        }),
      );
      return favouriteFoodList.filter(food => food !== undefined) as Food[];
    },
  });

const Favourites = () => {
  const { user } = useAuth();
  console.log('Favourites re-render');
  const { data, isPending, refetch, isFetching } = useFavouriteQuery(user?.email!);

  return isPending ? (
    <LoadingView />
  ) : (
    <StyledFlatList
      emptyTitle=''
      refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
      contentContainerStyle={{
        opacity: isFetching ? 0.4 : 1,
      }}
      keyExtractor={({ title }) => title}
      ListEmptyComponent={FavouriteEmpty}
      initialNumToRender={data?.length}
      data={data}
      renderItem={RenderItem}
    />
  );
};

const RenderItem: ListRenderItem<Food> = ({ item }) => <FavouriteCard {...item} />;

const FavouriteEmpty = () => {
  const router = useRouter();

  return (
    <EmptyList
      title={i18n.t('favourites.emptyList')}
      subField={
        <StyledPressable onPress={() => router.push('/(app)/(sidebar)')}>
          <StyledText
            type='SubInputField'
            color='orange'
            style={{
              textDecorationLine: 'underline',
            }}>
            {i18n.t('favourites.explore')}
          </StyledText>
        </StyledPressable>
      }
    />
  );
};

const FavouriteCard = memo(
  ({ title, imageUrlList }: Food) => {
    const styles = useStyles();
    const router = useRouter();
    const { user } = useAuth();

    const navigate = () =>
      router.push({
        pathname: '/(app)/information/[title]',
        params: {
          title,
        },
      });

    const queryClient = useQueryClient();

    const dislikeMutation = useMutation({
      mutationFn: async () => {
        const docRef = doc(FIREBASE_DB, 'users', user?.email!);
        await updateDoc(docRef, {
          favouritedFoods: arrayRemove(title),
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['favourites'],
        });
        queryClient.resetQueries({
          queryKey: ['food', 'list'],
        });
        queryClient.resetQueries({
          queryKey: ['food', title],
        });
      },
      onError: err => {
        console.log(err);
        StyledToast.show({
          type: 'error',
          text1: i18n.t('favourites.toast.error.text1', { title }),
          text2: i18n.t('favourites.toast.error.text2'),
        });
      },
    });

    return (
      <View style={styles.card}>
        <StyledImage
          source={{
            uri: imageUrlList[0],
          }}
          onPress={navigate}
          style={styles.cardImage}
        />
        <StyledPressable
          style={styles.cardDislikeButton}
          onPress={() => dislikeMutation.mutate()}
          disabled={dislikeMutation.isPending}>
          <HeartDislikeIcon />
        </StyledPressable>
        <View style={styles.cardFooter}>
          <StyledText type='Heading_5' color='white'>
            {title}
          </StyledText>
          <StyledPressable style={styles.redirectButton} onPress={navigate}>
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
    redirectButton: {
      backgroundColor: theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_50,
    },
    card: {
      flexBasis: '100%',
      height: hp(40),
      position: 'relative',
      borderRadius: STYLES.RADIUS.RADIUS_10,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...STYLES.SHADOW.SHADOW_ORANGE_8,
    },
    cardImage: {
      zIndex: 0,
      width: '100%',
      height: '100%',
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
    cardDislikeButton: {
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
      margin: STYLES.MARGIN.MARGIN_8,
      zIndex: 1,
    },
  };
});

export default Favourites;
