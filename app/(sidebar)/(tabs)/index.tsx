import { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import { makeStyles, useTheme, useThemeMode } from '@rneui/themed';
import StyledText from '@/components/Styled/StyledText';
import { SearchInput } from '@/components/Styled/StyledInput';
import StyledPressable from '@/components/Styled/StyledPressable';
import { ChevronRightIcon, HeartIcon, SearchIcon } from '@/components/Icon';
import { STYLES } from '@/lib/constants';
import { hp } from '@/lib/utils';
import { useAuthStates } from '@/states/auth';
import { useSettingStates } from '@/states/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FOOD_LIST = [
  {
    title: 'Bánh mì',
    imageUrl:
      'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
  },
  {
    title: 'Phở',
    imageUrl:
      'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg',
  },
  {
    title: 'Bún chả',
    imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2018/05/bun-cha.jpg',
  },
  {
    title: 'Bánh cuốn',
    imageUrl:
      'https://img-global.cpcdn.com/recipes/b235f5db0142062d/1360x964cq70/banh-cu%E1%BB%91n-trang-ch%E1%BA%A3o-nhan-th%E1%BB%8Bt-bam-n%E1%BA%A5m-meo-recipe-main-photo.webp',
  },
  {
    title: 'Gỏi cuốn',
    imageUrl: 'https://themiquanghouse.com/watermark/product/500x300x1/upload/product/goi-4600.jpg',
  },
  {
    title: 'Nem',
    imageUrl: 'https://image.vietnamnews.vn/uploadvnnews/Article/2018/9/17/nem281042039PM.jpg',
  },
  {
    title: 'Bánh Khọt',
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/52d3fafee4b03c7eaedee15f/6b5cb0c1-96cc-49e3-85ba-fe4a62ab43d3/EOS+M50_9482.jpg?format=2500w',
  },
  {
    title: 'Bánh Chưng',
    imageUrl: 'https://statics.vinpearl.com/banh-chung-1_1668262682.jpg',
  },
];

const Home = () => {
  const styles = useStyles();
  const { user } = useAuthStates();
  // console.log(user);
  const { setMode, mode } = useThemeMode();
  const { darkMode } = useSettingStates();
  const { theme } = useTheme();
  const dT = mode === 'dark';

  useEffect(() => {
    console.log('53: Run useEffect');
    console.log('54: ', darkMode);
    if (darkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }

    const fetch = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const value = await AsyncStorage.getItem(keys[0]);
      console.log(value);
    };

    fetch();
  }, []);

  useEffect(() => {
    console.log(mode);
    console.log('63: Mode change');
  }, [mode]);

  return (
    <View style={styles.container}>
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
      <FoodList foodList={FOOD_LIST} />
    </View>
  );
};

type FoodItem = {
  title: string;
  imageUrl: string;
};

const FoodCard = ({ title, imageUrl }: FoodItem) => {
  const styles = useStyles();
  const [love, setLove] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.cardImage}
      />
      <StyledPressable onPress={() => setLove(prev => !prev)} style={styles.cardLoveButton}>
        <HeartIcon active={love} />
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

type FoodListProps = {
  foodList: FoodItem[];
};

const FoodList = ({ foodList }: FoodListProps) => {
  const styles = useStyles();
  return (
    <FlatList
      keyExtractor={({ title }) => title}
      numColumns={2}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.foodListColumn}
      data={foodList}
      renderItem={({ item }) => <FoodCard {...item} />}
    />
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  return {
    container: {
      flex: 1,
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
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
      height: hp(35),
      position: 'relative',
      borderRadius: STYLES.RADIUS.RADIUS_10,
      marginBottom: STYLES.MARGIN.MARGIN_16,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...STYLES.SHADOW.SHADOW_ORANGE_15,
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
