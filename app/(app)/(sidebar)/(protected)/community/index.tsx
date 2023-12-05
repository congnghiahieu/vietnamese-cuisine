import { useCallback, useState, useEffect, useRef, memo } from 'react';
import { View, Image, FlatList, ListRenderItem } from 'react-native';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import { makeStyles, useTheme } from '@rneui/themed';
import { SolidButton, OutlineButton } from '@/components/Styled/StyledButton';
import { STYLES } from '@/lib/constants';
import StyledPressable from '@/components/Styled/StyledPressable';
import { AvatarIcon, CommentIcon, HeartIcon, PostIcon } from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import { getCurrentTimeISO, hp, timeSorter, wp } from '@/lib/utils';
import { StyledFlatList } from '@/components/Styled/StyledList';
import StyledImage from '@/components/Styled/StyledImage';
import { HoldingView, LoadingView } from '@/components/Styled/StyledView';
import { useAuth } from '@/context/AuthContext';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { ReFadeIn, ReFadeOut } from '@/components/Animated';
import { FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { i18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { StyledRefreshControl } from '@/components/Styled/StyledLoading';
import { useSound } from '@/hooks/useSound';
import Carousel from 'react-native-reanimated-carousel';
import { PaginationItem } from '@/components/Styled/StyledCarousel';
import { Post } from '@/config/model';

type Page = 'MyFeed' | 'MyWall';

const usePostQuery = ({ page, email }: { page: Page; email: string }) =>
  useQuery<Post[]>({
    queryKey: ['community', page],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'posts'));
      const postNoSorted = querySnapshot.docs.map(
        doc =>
          ({
            postId: doc.id,
            ...doc.data(),
          } as Post),
      );
      let postSorted = timeSorter({
        arr: postNoSorted,
        key: 'createdAt',
        sortType: 'DESC',
      });

      return postSorted;
    },
    select: data => {
      if (page === 'MyFeed') return data;
      return data.filter(post => post.userId === email);
    },
    staleTime: 0,
  });

const MyFeed = () => {
  const { user } = useAuth();

  console.log('Community re-render');
  const styles = useStyles();
  const [page, setPage] = useState<Page>('MyFeed');
  const { data, isPending, refetch, isFetching } = usePostQuery({ page, email: user?.email || '' });
  const flatListRef = useRef<FlatList<Post>>(null);

  return (
    <View style={{ flex: 1 }}>
      {isPending ? (
        <LoadingView />
      ) : (
        <StyledFlatList
          ref={flatListRef}
          emptyTitle={i18n.t('community.wall.emptyList')}
          ListHeaderComponent={
            <View style={styles.header}>
              <NavigateButton page={page} setPage={setPage} />
              <WannaPost />
            </View>
          }
          contentContainerStyle={{
            paddingHorizontal: 0,
            opacity: isFetching ? 0.4 : 1,
          }}
          refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
          keyExtractor={({ postId }) => postId}
          initialNumToRender={data?.length}
          data={data!}
          renderItem={RenderItem}
        />
      )}
    </View>
  );
};

const RenderItem: ListRenderItem<Post> = ({ item }) => <PostCard {...item} />;

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
      onPress={() => router.push('/(app)/(sidebar)/(protected)/community/publish')}>
      <StyledText type='Placeholder' color='whiteGrey'>
        {i18n.t('community.wall.wannaPost')}
      </StyledText>
      <PostIcon />
    </StyledPressable>
  );
};

const PostCard = memo(
  ({ username, postId, userId, createdAt, content, imageUrlList, comments }: Post) => {
    const styles = useCardStyles();
    const [love, setLove] = useState(false);
    const router = useRouter();
    const { playSound } = useSound(require('../../../../../assets/sound/love-sound.mp3'));

    const image =
      imageUrlList.length === 0 ? (
        <StyledDivider orientation='horizontal' />
      ) : imageUrlList.length === 1 ? (
        <StyledImage
          source={{
            uri: imageUrlList[0],
          }}
          style={styles.image}
        />
      ) : (
        <ImageList imageUrlList={imageUrlList} />
      );

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.info}>
            <AvatarIcon />
            <View style={styles.infoText}>
              <StyledText type='Heading_4' color='orange'>
                {username || userId}
              </StyledText>
              <StyledText type='Placeholder' color='blackGrey'>
                {i18n.distanceOfTimeInWords(createdAt, getCurrentTimeISO(), {
                  includeSeconds: true,
                })}
              </StyledText>
            </View>
          </View>
          <StyledText type='Body' color='grey'>
            {content}
          </StyledText>
        </View>
        {image}
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
            onPress={() =>
              router.push({
                pathname: '/(app)/(sidebar)/(protected)/community/comment/[postId]',
                params: { postId },
              })
            }>
            <CommentIcon />
            <StyledText>{i18n.t('community.wall.comments')}</StyledText>
          </StyledPressable>
        </View>
      </View>
    );
  },
  (prev, next) => prev.postId === next.postId,
);

const ImageList = ({ imageUrlList }: { imageUrlList: string[] }) => {
  const carouselWidth = wp(100);
  const carouselHeight = hp(40);
  const progressValue = useSharedValue<number>(0);

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <Carousel
        mode='horizontal-stack'
        modeConfig={{}}
        // autoPlay
        // autoPlayReverse
        // autoPlayInterval={2000}
        scrollAnimationDuration={STYLES.DURATION.DURATION_1000 / 2}
        loop
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) => {
          // console.log(absoluteProgress);
          progressValue.value = absoluteProgress;
        }}
        width={carouselWidth}
        height={carouselHeight}
        data={imageUrlList}
        renderItem={({ item }) => {
          return (
            <StyledImage
              source={{
                uri: item,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: STYLES.MARGIN.MARGIN_16,
          flexDirection: 'row',
          alignSelf: 'center',
          gap: STYLES.GAP.GAP_4,
        }}>
        {imageUrlList.map((_, index) => {
          return (
            <PaginationItem
              key={index}
              index={index}
              length={imageUrlList.length}
              animatedValue={progressValue}
            />
          );
        })}
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
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: STYLES.PADDING.PADDING_8,
    },
    image: {
      width: wp(100),
      height: hp(40),
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
