import { View } from 'react-native';
import { Route, useRouter } from 'expo-router';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { hp, wp } from '@/lib/utils';
import StyledText from '@/components/Styled/StyledText';
import { SolidButton } from '@/components/Styled/StyledButton';
import { StyledFlatList } from '@/components/Styled/StyledList';
import StyledImage from '@/components/Styled/StyledImage';
import { i18n } from '@/lib/i18n';
import { useEffect, useMemo, useState } from 'react';
import useI18nChangeEffect from '@/hooks/useI18nChangeEffect';

type Game = {
  title: string;
  imageUrl: string;
  desc: string;
  href: Route<string>;
};

const getGameList = () =>
  [
    {
      title: i18n.t('games.matchFood.title'),
      imageUrl:
        'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
      desc: i18n.t('games.matchFood.desc'),
      href: '/(sidebar)/games/match-food',
    },
    {
      title: i18n.t('games.pickIngredients.title'),
      imageUrl:
        'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/1_to_pho_bo_bao_nhieu_calo_9_762e002737.jpg',
      desc: i18n.t('games.pickIngredients.desc'),
      href: '/(sidebar)/games/pick-ingredients',
    },
    {
      title: i18n.t('games.guessFood.title'),
      imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2018/05/bun-cha.jpg',
      desc: i18n.t('games.guessFood.desc'),
      href: '/(sidebar)/games/guess-food',
    },
  ] as Game[];

const Games = () => {
  console.log('Games re-render');
  const [gameList, setGameList] = useState<Game[]>(getGameList);
  useI18nChangeEffect(() => setGameList(getGameList()));

  return <GameList gameList={gameList} />;
};

type GameListProps = {
  gameList: Game[];
};

const GameList = ({ gameList }: GameListProps) => {
  return (
    <StyledFlatList
      emptyTitle={i18n.t('games.emptyList')}
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
        <SolidButton title={i18n.t('games.playNow')} onPress={() => router.push(href)} />
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
