import { useState } from 'react';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
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

const POST_LIST = [
  {
    id: '1',
    name: 'Cong Nghia Hieu',
    time: '1 minute ago',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit cubilia pharetra.',
    imageUrl: 'https://static-images.vnncdn.net/files/publish/2022/9/15/banh-my-viet-nam-1632.jpg',
  },
  {
    id: '2',
    name: 'Cao Thanh Trung',
    time: '8 hours ago',
    desc: 'Massa cursus primis aptent mus hendrerit suspendisse, justo est phasellus sagittis fames scelerisque placerat, litora neque habitant id eros. Iaculis viverra per volutpat rhoncus eu ultricies id, eleifend vitae phasellus vehicula dictum vivamus, nam dapibus venenatis sem sed eget.',
    imageUrl:
      'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/plainc001123/phps8MbVn.jpg',
  },
];

type Page = 'MyFeed' | 'MyWall';

const MyFeed = () => {
  const styles = useStyles();
  const router = useRouter();
  const [page, setPage] = useState<Page>('MyFeed');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <NavigateButton page={page} setPage={setPage} />
        <WannaPost />
      </View>
      <PostList postList={POST_LIST} />
      {/* <PostList postList={[]} /> */}
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
        <SolidButton title={'My Feed'} containerStyle={styles.navigateButton} />
        <OutlineButton
          title={'My Wall'}
          containerStyle={styles.navigateButton}
          buttonStyle={styles.navigateButton}
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
          buttonStyle={styles.navigateButton}
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
  const { theme } = useTheme();

  return (
    <StyledPressable
      style={styles.createPostButton}
      onPress={() => router.push('/(sidebar)/community/post')}>
      <StyledText type='Placeholder' color='whiteGrey'>
        Wanna post somethings?
      </StyledText>
      <PostIcon />
    </StyledPressable>
  );
};

type Post = {
  id: string;
  name: string;
  time: string;
  desc: string;
  imageUrl: string;
};

const PostCard = ({ name, time, desc, imageUrl }: Post) => {
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
              {name}
            </StyledText>
            <StyledText type='Placeholder' color='blackGrey'>
              {time}
            </StyledText>
          </View>
        </View>
        <StyledText type='Body' color='grey'>
          {desc}
        </StyledText>
      </View>
      <StyledImage
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <StyledPressable onPress={() => setLove(prev => !prev)} style={styles.button}>
          <HeartIcon active={love} />
          {love ? (
            <StyledText type='Heading_5' color={'redPink'}>
              Love
            </StyledText>
          ) : null}
        </StyledPressable>
        <StyledDivider orientation='vertical' />
        <StyledPressable
          style={styles.button}
          onPress={() => router.push('/(sidebar)/community/comments')}>
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
      keyExtractor={({ id }) => id}
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
      overflow: 'hidden',
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
      height: hp(45),
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
