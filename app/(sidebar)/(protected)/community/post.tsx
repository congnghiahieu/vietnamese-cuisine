import { View, TextInput, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { ArrowLeftIcon, AvatarIcon, ImageIcon, PencilPostIcon } from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledDivider from '@/components/Styled/StyledDivider';
import StyledPressable from '@/components/Styled/StyledPressable';
import { useState } from 'react';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { SolidButton } from '@/components/Styled/StyledButton';
import { hp } from '@/lib/utils';
import { useRouter } from 'expo-router';
import StyledImage from '@/components/Styled/StyledImage';
import { SafeView } from '@/components/Styled/StyledView';

const WORD_LIMIT = 500;
const DEFAULT_LINE = 4;

const CreatePost = () => {
  const styles = useStyles();
  const [thought, setThought] = useState('');
  const [images, setImages] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const pickImages = () => setImages(prev => !prev);

  return (
    // <KeyboardAvoidingView contentContainerStyle={}>
    <SafeView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <StyledText type='Heading_3' color='blackGrey'>
            Make a Post
          </StyledText>
          <StyledPressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeftIcon />
          </StyledPressable>
        </View>
        <StyledDivider orientation='horizontal' />
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <AvatarIcon />
            <StyledText type='Heading_4' color='orange'>
              Cong Nghia Hieu
            </StyledText>
            <StyledPressable style={styles.imageButton} onPress={pickImages}>
              <ImageIcon />
            </StyledPressable>
          </View>
          <View style={styles.writeThought}>
            <StyledText type='Placeholder' color={theme.mode === 'dark' ? 'white' : 'black'}>
              {thought.length} / {WORD_LIMIT}
            </StyledText>
            <TextInput
              placeholder='Write your thought'
              placeholderTextColor={theme.colors.whiteGrey}
              multiline
              maxLength={WORD_LIMIT}
              numberOfLines={DEFAULT_LINE}
              style={styles.input}
              value={thought}
              onChangeText={setThought}
            />
          </View>
          <View style={styles.imageContainer}>
            {images ? (
              <StyledImage
                source={{
                  uri: 'https://bepxua.vn/wp-content/uploads/2022/08/cach-lam-bun-cha.jpg',
                }}
                style={styles.image}
              />
            ) : (
              <StyledPressable style={styles.imagePlaceholder} onPress={pickImages}>
                <StyledText type='Heading_2' color='blackGrey'>
                  Pick some images
                </StyledText>
              </StyledPressable>
            )}
          </View>
          <SolidButton
            title='Publish this post'
            icon={<PencilPostIcon />}
            iconPosition='left'
            containerStyle={{
              borderRadius: STYLES.RADIUS.RADIUS_10,
              marginTop: STYLES.MARGIN.MARGIN_16,
            }}
          />
        </View>
      </ScrollView>
    </SafeView>
    // </KeyboardAvoidingView>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    container: {
      flex: 1,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderTopLeftRadius: STYLES.RADIUS.RADIUS_30,
      borderTopRightRadius: STYLES.RADIUS.RADIUS_30,
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
    content: {
      flex: 1,
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      marginVertical: STYLES.MARGIN.MARGIN_8,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageButton: {
      backgroundColor: `${theme.colors.green}33`,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      padding: STYLES.PADDING.PADDING_8,
    },
    writeThought: {
      marginTop: STYLES.MARGIN.MARGIN_8,
      gap: STYLES.GAP.GAP_8,
    },
    input: {
      textAlignVertical: 'top',
      textAlign: 'left',
      ...TEXT_STYLE_TYPE_MAP.Body,
      color: theme.colors.grey,
      // backgroundColor: 'red',
    },
    imageContainer: {
      height: hp(55),
      // height: 450,
      maxHeight: 450,
    },
    imagePlaceholder: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'dashed',
      borderColor: theme.colors.blackGrey,
      borderWidth: 2,
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
  };
});

export default CreatePost;
