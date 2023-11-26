import { useCallback, useState, useEffect, useRef } from 'react';
import { View, Image, FlatList } from 'react-native';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import { makeStyles, useTheme } from '@rneui/themed';
import { SolidButton, OutlineButton } from '@/components/Styled/StyledButton';
import { STYLES } from '@/lib/constants';
import StyledPressable from '@/components/Styled/StyledPressable';
import { AvatarIcon, CommentIcon, HeartIcon, PostIcon } from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import { hp } from '@/lib/utils';
import { StyledFlatList } from '@/components/Styled/StyledList';
import StyledImage from '@/components/Styled/StyledImage';
import { HoldingView, LoadingView } from '@/components/Styled/StyledView';
import { useAuth } from '@/context/AuthContext';
import Animated from 'react-native-reanimated';
import { ReFadeIn, ReFadeOut } from '@/components/Animated';
import { FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { i18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { StyledRefreshControl } from '@/components/Styled/StyledLoading';
import { useSound } from '@/hooks/useSound';

type Page = 'MyFeed' | 'MyWall';

type Post = {
  postId: string;
  userId: string;
  content: string;
  imageUrlList: string[];
  loveNumber: number;
  comments: Comment[];
  createdAt: string;
};

const usePostQuery = (page: Page) =>
  useQuery<Post[]>({
    queryKey: ['community', page],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'posts'));
      return querySnapshot.docs.map(
        doc =>
          ({
            postId: doc.id,
            ...doc.data(),
          } as Post),
      );
    },
    staleTime: 0,
  });

const MyFeed = () => {
  const { user } = useAuth();

  console.log('Community re-render');
  const styles = useStyles();
  const [page, setPage] = useState<Page>('MyFeed');
  const { data, isPending, refetch, isFetching } = usePostQuery(page);
  const flatListRef = useRef<FlatList<Post>>(null);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [page]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <NavigateButton page={page} setPage={setPage} />
        <WannaPost />
      </View>
      {isPending ? (
        <LoadingView />
      ) : (
        <StyledFlatList
          ref={flatListRef}
          emptyTitle={i18n.t('community.wall.emptyList')}
          refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
          keyExtractor={({ postId }) => postId}
          data={data}
          renderItem={({ item }) => <PostCard {...item} />}
          contentContainerStyle={{
            paddingHorizontal: 0,
            opacity: isFetching ? 0.4 : 1,
          }}
        />
      )}
    </View>
  );
};

type NavigateButtonProps = {
  page: Page;
  setPage: (page: Page) => void;
};

const NavigateButton = ({ page, setPage }: NavigateButtonProps) => {
  const styles = useStyles();

  if (page === 'MyFeed') {
    return (
      <View style={styles.navigate}>
        <SolidButton
          title={i18n.t('community.wall.myFeed')}
          containerStyle={styles.navigateButton}
        />
        <OutlineButton
          title={i18n.t('community.wall.myWall')}
          containerStyle={styles.navigateButton}
          buttonStyle={{
            borderRadius: STYLES.RADIUS.RADIUS_10,
          }}
          onPress={() => setPage('MyWall')}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.navigate}>
        <OutlineButton
          title={i18n.t('community.wall.myFeed')}
          containerStyle={styles.navigateButton}
          buttonStyle={{
            borderRadius: STYLES.RADIUS.RADIUS_10,
          }}
          onPress={() => setPage('MyFeed')}
        />
        <SolidButton
          title={i18n.t('community.wall.myWall')}
          containerStyle={styles.navigateButton}
        />
      </View>
    );
  }
};

const WannaPost = () => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <StyledPressable
      style={styles.createPostButton}
      onPress={() => router.push('/(sidebar)/(protected)/community/publish')}>
      <StyledText type='Placeholder' color='whiteGrey'>
        {i18n.t('community.wall.wannaPost')}
      </StyledText>
      <PostIcon />
    </StyledPressable>
  );
};

const PostCard = ({ userId, createdAt, content, imageUrlList }: Post) => {
  const styles = useCardStyles();
  const [love, setLove] = useState(false);
  const router = useRouter();
  const { playSound } = useSound(require('../../../../assets/sound/love-sound.mp3'));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.info}>
          <AvatarIcon />
          <View style={styles.infoText}>
            <StyledText type='Heading_4' color='orange'>
              {userId}
            </StyledText>
            <StyledText type='Placeholder' color='blackGrey'>
              {createdAt}
            </StyledText>
          </View>
        </View>
        <StyledText type='Body' color='grey'>
          {content}
        </StyledText>
      </View>
      <StyledImage
        source={{
          uri: imageUrlList[0],
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <StyledPressable
          onPress={() => {
            if (!love) {
              playSound();
            }
            setLove(prev => !prev);
          }}
          style={styles.button}>
          <HeartIcon active={love} />
          {love ? (
            <Animated.View entering={ReFadeIn}>
              <StyledText type='Heading_5' color={'redPink'}>
                {i18n.t('community.wall.love')}
              </StyledText>
            </Animated.View>
          ) : null}
        </StyledPressable>
        <StyledDivider orientation='vertical' />
        <StyledPressable
          style={styles.button}
          onPress={() => router.push('/(sidebar)/(protected)/community/comment')}>
          <CommentIcon />
          <StyledText>{i18n.t('community.wall.comments')}</StyledText>
        </StyledPressable>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    header: {
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      marginVertical: STYLES.MARGIN.MARGIN_8,
      gap: STYLES.GAP.GAP_16,
    },
    navigate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_16,
    },
    navigateButton: {
      borderRadius: STYLES.RADIUS.RADIUS_10,
      flex: 1,
    },
    createPostButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      paddingVertical: STYLES.PADDING.PADDING_8,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
  };
});

const useCardStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    card: {
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    header: {
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      marginVertical: STYLES.MARGIN.MARGIN_8,
      gap: STYLES.GAP.GAP_4,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      marginLeft: STYLES.MARGIN.MARGIN_32,
    },
    image: {
      width: '100%',
      height: hp(40),
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: STYLES.PADDING.PADDING_8,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: STYLES.GAP.GAP_4,
    },
  };
});

export default MyFeed;
