import { useState } from 'react';
import { View, TextInput, ScrollView, Platform } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {
  AvatarIcon,
  BroomIcon,
  CameraIconGreen,
  ImageIcon,
  PencilPostIcon,
  UploadIcon,
} from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { SolidButton } from '@/components/Styled/StyledButton';
import StyledDivider from '@/components/Styled/StyledDivider';
import { PaginationItem } from '@/components/Styled/StyledCarousel';
import StyledImage from '@/components/Styled/StyledImage';
import { hp, wp } from '@/lib/utils';
import { STYLES } from '@/lib/constants';
import { Stack } from 'expo-router';

const WORD_LIMIT = 500;

const Publish = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [thought, setThought] = useState('');
  const [, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
  const [, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [imageAssetList, setImageAssetList] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const pickImages = async () => {
    const permission = await requestLibraryPermission();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      orderedSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result.assets);
      setImageAssetList(result.assets);
    }
  };

  const takePhoto = async () => {
    const permission = await requestCameraPermission();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      orderedSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result.assets);
      setImageAssetList(result.assets);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => {
            if (imageAssetList.length === 0) {
              return null;
            }
            return (
              <StyledPressable onPress={() => setImageAssetList([])}>
                <BroomIcon />
              </StyledPressable>
            );
          },
        }}
      />
      <StyledDivider orientation='horizontal' />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentHeader}>
          <AvatarIcon />
          <StyledText type='Heading_4' color='orange'>
            Cong Nghia Hieu
          </StyledText>
          <StyledPressable style={styles.imageButton} onPress={takePhoto}>
            <CameraIconGreen />
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
            // numberOfLines={DEFAULT_LINE}
            style={styles.input}
            value={thought}
            onChangeText={setThought}
          />
        </View>
        <View style={styles.imageContainer}>
          {imageAssetList.length ? (
            <ImageList imageUrlList={imageAssetList.map(asset => asset.uri)} />
          ) : (
            <StyledPressable style={styles.imagePlaceholder} onPress={pickImages}>
              <StyledText type='Heading_2' color='blackGrey'>
                Pick some images
              </StyledText>
              <UploadIcon />
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
      </ScrollView>
    </>
  );
};

const ImageList = ({ imageUrlList }: { imageUrlList: string[] }) => {
  const carouselWidth = wp(100) - STYLES.MARGIN.MARGIN_16 * 2;
  const carouselHeight = hp(48);
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
    container: {
      flex: 1,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      paddingTop: STYLES.PADDING.PADDING_8,
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
      minHeight: 100,
      maxHeight: 150,
      ...(Platform.OS === 'ios' ? {} : {}),
    },
    imageContainer: {
      height: hp(48),
      marginTop: STYLES.MARGIN.MARGIN_8,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      overflow: 'hidden',
    },
    imagePlaceholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_8,
      borderStyle: 'dashed',
      borderColor: theme.colors.blackGrey,
      borderWidth: 2,
      borderRadius: STYLES.RADIUS.RADIUS_10,
    },
  };
});

export default Publish;
