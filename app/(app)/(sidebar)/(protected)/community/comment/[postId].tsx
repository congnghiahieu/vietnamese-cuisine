import { View, KeyboardAvoidingView, ListRenderItem } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { AvatarIcon, CommentIcon, HeartFillIcon, SendIcon } from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import { memo, useState } from 'react';
import { SolidButton } from '@/components/Styled/StyledButton';
import { SearchInput } from '@/components/Styled/StyledInput';
import { StyledFlatList } from '@/components/Styled/StyledList';
import { i18n } from '@/lib/i18n';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyledRefreshControl } from '@/components/Styled/StyledLoading';
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
  arrayUnion,
} from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { v4 as uuid } from 'uuid';
import { Comment, User } from '@/config/model';
import { LoadingView } from '@/components/Styled/StyledView';
import StyledToast from '@/components/Styled/StyledToast';
import { getCurrentTimeISO, timeSorter } from '@/lib/utils';

const WORD_LIMIT = 400;

const usePostCommentMutation = (postId: string) =>
  useMutation({
    mutationFn: async ({ username, content }: Omit<Comment, 'createdAt' | 'commentId'>) => {
      const commentId = uuid();
      await setDoc(doc(FIREBASE_DB, 'comments', commentId), {
        username,
        content,
        createdAt: getCurrentTimeISO(),
      } satisfies Omit<Comment, 'commentId'>);
      const docRef = doc(FIREBASE_DB, 'posts', postId);
      await updateDoc(docRef, {
        comments: arrayUnion(commentId),
      });
    },
  });

const useCommentsQuery = (postId: string) =>
  useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      console.log(postId);
      if (!postId) return [];

      const postRef = doc(FIREBASE_DB, 'posts', postId);
      const postSnap = await getDoc(postRef);
      if (!postSnap.exists()) return [];

      const commentIdList: string[] = postSnap.data()?.comments || [];
      const commentList = await Promise.all(
        commentIdList.map(async id => {
          const commentRef = doc(FIREBASE_DB, 'comments', id);
          const commentSnap = await getDoc(commentRef);
          if (!commentSnap.exists()) return undefined;
          return {
            commentId: id,
            ...commentSnap.data(),
          } as Comment;
        }),
      );

      const sorted = timeSorter({
        arr: commentList.filter(comment => comment !== undefined) as Comment[],
        key: 'createdAt',
        sortType: 'DESC',
      });
      return sorted;
    },
  });

const useProfileQuery = ({ email }: { email: string }) =>
  useQuery<User>({
    queryKey: ['profile', email],
    queryFn: async () => {
      if (!email) throw new Error();

      const docRef = doc(FIREBASE_DB, 'users', email);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) throw new Error(i18n.t('other.errorOccurr'));

      const user = userDoc.data() as User;
      return user;
    },
    retry: 0,
  });

const CommentComponent = () => {
  const { user } = useAuth();

  const styles = useStyles();
  const [comment, setComment] = useState('');
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const postId = params.postId.toString();
  const queryClient = useQueryClient();
  const { data: dbUser, isPending: isUserPending } = useProfileQuery({
    email: user?.email || '',
  });
  const { data, isPending: isCommentPending, refetch, isFetching } = useCommentsQuery(postId);
  const postCommentMutation = usePostCommentMutation(postId);

  const handlePostComment = () => {
    if (!comment.trim()) {
      StyledToast.show({
        type: 'warning',
        text1: i18n.t('community.comment.toast.warning'),
        visibilityTime: 2000,
      });
      return;
    }
    postCommentMutation.mutate(
      {
        content: comment,
        username: dbUser?.fullname!,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['comments', postId],
          });
        },
        onError: () => {
          StyledToast.show({
            type: 'error',
            text1: i18n.t('community.comment.toast.error.text1'),
            text2: i18n.t('community.comment.toast.error.text2'),
          });
        },
        onSettled: () => {
          postCommentMutation.reset();
          setComment('');
        },
      },
    );
  };

  return (
    <>
      <StyledDivider orientation='horizontal' />
      {isUserPending || isCommentPending ? (
        <LoadingView />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          keyboardVerticalOffset={120}>
          <StyledFlatList
            emptyTitle={i18n.t('community.comment.firstOne')}
            refreshControl={<StyledRefreshControl refreshing={isFetching} onRefresh={refetch} />}
            keyExtractor={({ commentId }) => commentId}
            style={{
              flexGrow: 1,
            }}
            initialNumToRender={data?.length}
            data={data}
            renderItem={RenderItem}
          />
          <StyledDivider orientation='horizontal' />
          <View style={styles.footer}>
            <View style={styles.info}>
              <StyledText type='Placeholder' color={theme.mode === 'dark' ? 'white' : 'black'}>
                {comment.length} / {WORD_LIMIT}
              </StyledText>
              <View style={styles.numberContainer}>
                {/* <View style={styles.number}>
                <HeartFillIcon />
                <StyledText type='Heading_4' color='redPink'>
                  55
                </StyledText>
              </View> */}
                <View style={styles.number}>
                  <CommentIcon />
                  <StyledText type='Heading_4' color='blackGrey'>
                    {data?.length}
                  </StyledText>
                </View>
              </View>
            </View>
            <View style={styles.yourComment}>
              <SearchInput
                placeholder={i18n.t('community.comment.postComment')}
                containerStyle={{
                  flex: 1,
                }}
                maxLength={WORD_LIMIT}
                value={comment}
                onChangeText={setComment}
                blurOnSubmit={false}
              />
              <SolidButton
                icon={<SendIcon width={30} height={30} />}
                iconPosition='left'
                containerStyle={{
                  borderRadius: STYLES.RADIUS.RADIUS_10,
                }}
                buttonStyle={{
                  paddingHorizontal: STYLES.PADDING.PADDING_16,
                  paddingVertical: STYLES.PADDING.PADDING_8 + 2,
                }}
                onPress={handlePostComment}
                loadingStyle={{
                  paddingHorizontal: STYLES.PADDING.PADDING_4 + 1,
                  paddingVertical: STYLES.PADDING.PADDING_4 - 1,
                }}
                loading={postCommentMutation.isPending}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

const RenderItem: ListRenderItem<Comment> = ({ item }) => <CommentCard {...item} />;

const CommentCard = memo(
  ({ username, content, createdAt }: Comment) => {
    const styles = useStyles();

    return (
      <View style={styles.card}>
        <AvatarIcon />
        <View style={styles.content}>
          <View style={styles.meta}>
            <StyledText type='Heading_5' color='orange'>
              {username}
            </StyledText>
            <StyledText type='Placeholder' color='blackGrey'>
              {i18n.distanceOfTimeInWords(createdAt, getCurrentTimeISO(), {
                includeSeconds: true,
              })}
            </StyledText>
          </View>
          <StyledText type='Comment' color='grey'>
            {content}
          </StyledText>
        </View>
      </View>
    );
  },
  (prev, next) => prev.commentId === next.commentId,
);

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    container: {
      flex: 1,
      backgroundColor: dT ? theme.colors.background : theme.colors.white,
    },
    header: {
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      marginVertical: STYLES.MARGIN.MARGIN_8,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 0,
    },
    footer: {
      margin: STYLES.MARGIN.MARGIN_16,
      marginTop: STYLES.MARGIN.MARGIN_4,
      gap: STYLES.GAP.GAP_8,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    numberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_16,
    },
    number: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_4,
    },
    yourComment: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_8,
    },
    card: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: STYLES.GAP.GAP_8,
    },
    content: {
      flex: 1,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      paddingTop: STYLES.PADDING.PADDING_4,
      paddingBottom: STYLES.PADDING.PADDING_8,
      // backgroundColor: dT ? theme.colors.background : theme.colors.white,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    meta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  };
});

export default CommentComponent;
