import { View, TextInput, Image, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import {
  ArrowLeftIcon,
  AvatarIcon,
  CommentIcon,
  HeartIcon,
  ImageIcon,
  PencilPostIcon,
  SendIcon,
} from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import StyledPressable from '@/components/Styled/StyledPressable';
import { useState } from 'react';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { SolidButton } from '@/components/Styled/StyledButton';
import { hp } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { SearchInput } from '@/components/Styled/StyledInput';
import { StyledFlatList } from '@/components/Styled/StyledList';
import { KeyboardView, SafeView } from '@/components/Styled/StyledView';

const WORD_LIMIT = 100;
const COMMENT_LIST = [
  {
    id: '1',
    name: 'Cong Nghia Hieu',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus sed, suscipit auctor morbi orci tincidunt posuere praesent lacinia, elementum integer vivamus fusce lobortis nascetur nibh tempor.',
  },
  {
    id: '2',
    name: 'Cao Thanh Trung',
    content:
      'Quisque dictum sapien hendrerit egestas suscipit dignissim placerat diam condimentum, potenti nec nunc faucibus enim dapibus metus nulla, ridiculus lectus maecenas posuere aliquam malesuada praesent suspendisse.',
  },
  {
    id: '3',
    name: 'Ngo Hoang Duy',
    content:
      'Maecenas consequat ad praesent inceptos fusce nisl diam duis tempus, scelerisque netus mi suscipit sociosqu lectus varius ultricies commodo, cras leo taciti semper dictumst ridiculus libero porta.',
  },
  {
    id: '4',
    name: 'Tran Viet Dung',
    content:
      'Rhoncus placerat tristique habitasse nascetur libero suscipit convallis augue, hac molestie natoque porta magnis primis blandit fames, nam duis leo tempor neque platea enim.',
  },
  {
    id: '5',
    name: 'Nguyen Van A',
    content:
      'Auctor vitae suspendisse senectus vulputate at pellentesque, fames libero ut ligula mus, potenti duis lectus sodales augue. Quisque himenaeos tristique ullamcorper montes feugiat suspendisse, aliquet duis taciti magna id tortor maecenas, torquent donec varius interdum vivamus.',
  },
  {
    id: '6',
    name: 'Tran Van B',
    content:
      'vTincidunt ligula ante volutpat nec malesuada ullamcorper nisi, luctus duis morbi pharetra arcu ac. Praesent senectus nunc quisque semper dui varius odio ultrices sodales, faucibus morbi habitasse leo sed rhoncus sollicitudin venenatis condimentum, pretium molestie ante enim gravida eros vitae facilisis.',
  },
];

const Comment = () => {
  const styles = useStyles();
  const [comments, setComments] = useState('');
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={120}>
      <CommentList commentList={COMMENT_LIST} />
      <StyledDivider orientation='horizontal' />
      <View style={styles.footer}>
        <View style={styles.info}>
          <StyledText type='Placeholder' color={theme.mode === 'dark' ? 'white' : 'black'}>
            {comments.length} / {WORD_LIMIT}
          </StyledText>
          <View style={styles.numberContainer}>
            <View style={styles.number}>
              <HeartIcon active />
              <StyledText type='Heading_4' color='redPink'>
                55
              </StyledText>
            </View>
            <View style={styles.number}>
              <CommentIcon />
              <StyledText type='Heading_4' color='blackGrey'>
                16
              </StyledText>
            </View>
          </View>
        </View>
        <View style={styles.yourComment}>
          <SearchInput
            placeholder='Post your comment!'
            containerStyle={{
              flex: 1,
            }}
            maxLength={WORD_LIMIT}
            value={comments}
            onChangeText={setComments}
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
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

type Comment = {
  id: string;
  name: string;
  content: string;
};

const CommentCard = ({ name, content }: Comment) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <AvatarIcon />
      <View style={styles.content}>
        <StyledText type='Heading_5' color='orange'>
          {name}
        </StyledText>
        <StyledText type='Comment' color='grey'>
          {content}
        </StyledText>
      </View>
    </View>
  );
};

type CommentListProps = {
  commentList: Comment[];
};

const CommentList = ({ commentList }: CommentListProps) => {
  return (
    <StyledFlatList
      emptyTitle={`Be the first one \n comment this post`}
      keyExtractor={({ id }) => id}
      data={commentList}
      renderItem={({ item }) => <CommentCard {...item} />}
    />
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    container: {
      flex: 1,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
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
      paddingBottom: STYLES.PADDING.PADDING_4,
      backgroundColor: dT ? theme.colors.background : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
  };
});

export default Comment;
