import { useCallback, useState, useEffect} from 'react';
import { View, Image } from 'react-native';
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
import { useAuthStates } from '@/states/auth';
import { HoldingView } from '@/components/Styled/StyledView';
import { useAuth } from '@/context/AuthContext';
import Animated from 'react-native-reanimated';
import { ReFadeIn, ReFadeOut } from '@/components/Animated';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from '@/config/firebase';
import { query, collection, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';


const POST_LIST = [
  {
    postId: '1',
    userId: 'Cong Nghia Hieu',
    createdAt: '1 minute ago',
    content: 'Siuuu',
    imageUrlList: ['https://static-images.vnncdn.net/files/publish/2022/9/15/banh-my-viet-nam-1632.jpg'],
    loveNumber: 0,
    comments: []
  },
  {
    postId: '2',
    userId: 'Cao Thanh Trung',
    createdAt: '1 minute ago',
    content: 'hehehe',
    imageUrlList: ['https://static-images.vnncdn.net/files/publish/2022/9/15/banh-my-viet-nam-1632.jpg'],
    loveNumber: 0,
    comments: []
  },
];

type Page = 'MyFeed' | 'MyWall';

const MyFeed = () => {
  console.log('Community re-render');
  const styles = useStyles();
  const { user } = useAuth();
  const [page, setPage] = useState<Page>('MyFeed');

  const [postList, setPostList] = useState<Post[]>([]);
  const getpostList = async () => {
    try {
     
    } catch (error) {
      console.error('Error fetching post list data from FIRESTORE:', error);
    }
  };

  useEffect(() => {
    getpostList();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <NavigateButton page={page} setPage={setPage} />
        <WannaPost />
      </View>
      <PostList postList={POST_LIST} />
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
        <SolidButton title='My Feed' containerStyle={styles.navigateButton} />
        <OutlineButton
          title='My Wall'
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
          title={'My Feed'}
          containerStyle={styles.navigateButton}
          buttonStyle={{
            borderRadius: STYLES.RADIUS.RADIUS_10,
          }}
          onPress={() => setPage('MyFeed')}
        />
        <SolidButton title={'My Wall'} containerStyle={styles.navigateButton} />
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
        Wanna post somethings?
      </StyledText>
      <PostIcon />
    </StyledPressable>
  );
};

type Post = {
    postId: string;
    userId: string;
    content: string;
    imageUrlList: string[];
    loveNumber: number;
    comments: Comment[];
    createdAt: string;
  };

const PostCard = ({ userId, createdAt, content, imageUrlList }: Post) => {
  const styles = useCardStyles();
  const [love, setLove] = useState(false);
  const router = useRouter();

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
        <StyledPressable onPress={() => setLove(prev => !prev)} style={styles.button}>
          <HeartIcon active={love} />
          {love ? (
            <Animated.View entering={ReFadeIn}>
              <StyledText type='Heading_5' color={'redPink'}>
                Love
              </StyledText>
            </Animated.View>
          ) : null}
        </StyledPressable>
        <StyledDivider orientation='vertical' />
        <StyledPressable
          style={styles.button}
          onPress={() => router.push('/(sidebar)/(protected)/community/comment')}>
          <CommentIcon />
          <StyledText>Comments</StyledText>
        </StyledPressable>
      </View>
    </View>
  );
};

type PostListProps = {
  postList: Post[];
};

const PostList = ({ postList }: PostListProps) => {
  return (
    <StyledFlatList
      emptyTitle='No post available!'
      keyExtractor={({ postId }) => postId}
      data={postList}
      renderItem={({ item }) => <PostCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
    />
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
