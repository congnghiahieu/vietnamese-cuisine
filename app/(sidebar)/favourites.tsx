import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Image, View } from 'react-native';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { hp } from '@/lib/utils';
import StyledText from '@/components/Styled/StyledText';
import { EmptyList, StyledFlatList } from '@/components/Styled/StyledList';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ChevronRightIcon, HeartDislikeIcon } from '@/components/Icon';
import StyledImage from '@/components/Styled/StyledImage';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

const Favorites = () => {
  console.log('Favourites re-render');
  const user = FIREBASE_AUTH.currentUser;
  const router = useRouter();
  console.log('User email:', user?.email);
  if (!user) {
    return <Redirect href={'/login'} />;
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     if (!user) {
  //       router.replace('/login');
  //     }
  //   }, []),
  // );
  const [favoriteList, setFavoriteList] = useState<Favorite[]>([]);
  const getFavoriteList = async () => {
    try {
      if (user?.email) {
        let favoriteList: Favorite[] = [];
        const docRef = doc(FIREBASE_DB, 'users', user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedFavoriteList = docSnap.data()?.favoriteFoods || [];
          for (const foodId of fetchedFavoriteList) {
            const foodRef = doc(FIREBASE_DB, 'foods', foodId);
            const foodSnap = await getDoc(foodRef);
            if (foodSnap.exists()) {
              const { title, imageUrl } = foodSnap.data();
              const temp: Favorite = { title, imageUrl };
              favoriteList.push(temp);
            }
          }
        }
        setFavoriteList(favoriteList);
        console.log(favoriteList);
      }
    } catch (error) {
      console.error('Error fetching food list data from FIRESTORE:', error);
    }
  };

  useEffect(() => {
    getFavoriteList();
  }, []);
  return (
    <FavoriteList favoriteList={favoriteList} />
    // <FavoriteList favoriteList={[]} />
  );
};

type Favorite = {
  title: string;
  imageUrl: string;
};

const FavoriteCard = ({ title, imageUrl }: Favorite) => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <View style={styles.card}>
      <StyledImage
        source={{
          uri: imageUrl,
        }}
        style={styles.cardImage}
      />
      <StyledPressable style={styles.cardDislikeButton}>
        <HeartDislikeIcon />
      </StyledPressable>
      <View style={styles.cardFooter}>
        <StyledText type='Heading_5' color='white'>
          {title}
        </StyledText>
        <StyledPressable style={styles.redirectButton} onPress={() => router.push('/information')}>
          <ChevronRightIcon />
        </StyledPressable>
      </View>
    </View>
  );
};

type FavoriteListProps = {
  favoriteList: Favorite[];
};

const FavoriteList = ({ favoriteList }: FavoriteListProps) => {
  return (
    <StyledFlatList
      emptyTitle=''
      keyExtractor={({ title }) => title}
      data={favoriteList}
      renderItem={({ item }) => <FavoriteCard {...item} />}
      ListEmptyComponent={FavoriteEmpty}
    />
  );
};

const FavoriteEmptySubField = () => {
  const router = useRouter();

  return (
    <StyledPressable onPress={() => router.push('/(sidebar)/(home)/')}>
      <StyledText
        type='SubInputField'
        color='orange'
        style={{
          textDecorationLine: 'underline',
        }}>
        Explore more Vietnamese food
      </StyledText>
    </StyledPressable>
  );
};

const FavoriteEmpty = () => {
  return <EmptyList title='No favorite dish' subField={<FavoriteEmptySubField />} />;
};

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
      maxHeight: 400,
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

export default Favorites;
