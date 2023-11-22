import { View } from 'react-native';
import { Route, useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { hp, wp } from '@/lib/utils';
import StyledText from '@/components/Styled/StyledText';
import { SolidButton } from '@/components/Styled/StyledButton';
import { StyledFlatList } from '@/components/Styled/StyledList';
import StyledImage from '@/components/Styled/StyledImage';

type Game = {
  title: string;
  imageUrl: string;
  desc: string;
  href: Route<string>;
};

const GAME_LIST: Game[] = [
  {
    title: 'Match Food',
    imageUrl:
      'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
    desc: 'Match Food is a classic memory game. Player takes turns flipping over two tiles at a time. If the two tiles match, they are removed from the board. If the tiles do not match, they are flipped back over.',
    href: '/(sidebar)/games/match-food',
  },
  {
    title: 'Pick Ingredients',
    imageUrl:
      'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg',
    desc: 'Pick Ingredients is a game challenge your knowledge. You need to find all main ingredients to make a Vietnamese dish in a provided set of ingredients. By dragging & dropping ingredients into a bag, you can win the game.',
    href: '/(sidebar)/games/pick-ingredients',
  },
  {
    title: 'Guess Food',
    imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2018/05/bun-cha.jpg',
    desc: 'PicQuiz - Guess Pics',
    href: '/(sidebar)/games/guess-food',
  },
];

const Games = () => {
  console.log('Games re-render');
  return <GameList gameList={GAME_LIST} />;
};

type GameListProps = {
  gameList: Game[];
};

const GameList = ({ gameList }: GameListProps) => {
  return (
    <StyledFlatList
      emptyTitle='No game available!'
      keyExtractor={({ title }) => title}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      data={gameList}
      renderItem={({ item }) => <GameCard {...item} />}
    />
  );
};

const GameCard = ({ title, desc, imageUrl, href }: Game) => {
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
      <View style={styles.cardContent}>
        <View>
          <StyledText type='Heading_4' color='blackGrey'>
            {title}
          </StyledText>
          <StyledText type='Comment' color='grey'>
            {desc}
          </StyledText>
        </View>
        <SolidButton title='Play now' onPress={() => router.push(href)} />
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  return {
    card: {
      flexDirection: 'column',
      flexBasis: '100%',
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_4),
    },
    cardImage: {
      flex: 1,
      width: '100%',
      height: hp(40),
      borderTopLeftRadius: STYLES.RADIUS.RADIUS_20,
      borderTopRightRadius: STYLES.RADIUS.RADIUS_20,
    },
    cardContent: {
      padding: STYLES.PADDING.PADDING_16,
      gap: STYLES.GAP.GAP_16,
    },
  };
});

export default Games;
