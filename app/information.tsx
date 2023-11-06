import { useRef, useMemo, useCallback, useState } from 'react';
import { ImageBackground, View, StatusBar, Animated } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Slider, ListItem, makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import BottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import StyledHandle from '@/components/Styled/BottomSheet/StyledHandle';
import StyledBackdrop, { CustomBackdrop } from '@/components/Styled/BottomSheet/StyledBackdrop';
import StyledBackground from '@/components/Styled/BottomSheet/StyledBackground';
import StyledText from '@/components/Styled/StyledText';
import StyledPressable from '@/components/Styled/StyledPressable';
import { useRouter } from 'expo-router';

const Information = () => {
  const styles = useStyles();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '70%', '90%'], []);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.backIconContainer}>
          <StyledPressable onPress={() => router.back()}>
            <MaterialIcons name='keyboard-arrow-left' style={styles.backIcon} />
          </StyledPressable>
        </View>
        <ImageBackground
          source={{
            uri: 'https://file1.dangcongsan.vn/data/0/images/2021/02/08/duongntcd/13-chung-tet-td.jpg?dpi=150&quality=100&w=680',
          }}
          style={styles.background}
        />
      </View>
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleComponent={StyledHandle}
        backdropComponent={CustomBackdrop}
        backgroundComponent={StyledBackground}
        animationConfigs={animationConfigs}
        enablePanDownToClose={false}>
        <FoodInformationScrollView />
      </BottomSheet>
    </View>
  );
};

const INGREDIENT_LIST = [
  '1 kg xương ống bò',
  '800 gram gù bò',
  '80 gram gừng',
  '2 thảo quả',
  '1 gram hạt ngò',
  '5 nụ đinhh hương',
  'Rượu mai quế lộ',
  'Hành tây, đường phèn, hạt nêm, bột ngọt',
  '500 gram bắp bò hoa',
  'Ngò gai, rau quế',
  '2 tai đại hồi',
  '1 nhánh nhỏ quế',
  '1 gram tiểu hồi',
  '1 miếng nhỏ trần bì',
  '10 gram tiêu sọ',
  'Đường cát, muối, giấm, bánh phở',
] as const;

type IngredientVerticalListProps = {
  ingredients: string[];
};

const IngredientVerticalList = ({ ingredients }: IngredientVerticalListProps) => {
  return (
    <View style={{ flex: 1 }}>
      {ingredients.map(ingredient => (
        <ListItem
          key={ingredient}
          containerStyle={{
            backgroundColor: 'white',
            paddingVertical: STYLES.PADDING.PADDING_4,
          }}>
          <ListItem.Content>
            <StyledText type='Body' color='grey'>
              {ingredient}
            </StyledText>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

const STEPS = [
  {
    title: 'Bước 1: Sơ chế xương bò, bắp bò, gù bò',
    content:
      'Ngâm xương ống với nước muối và giấm khoảng 2 tiếng cho sạch và bớt mùi tanh. Sau đó đem xương đi rửa sạch rồi cho vào nồi nước sôi cùng với gừng và 1 muỗng canh muối đun trong khoảng 10 phút thì vớt ra, trần qua nước lạnh. Cách này sẽ loại bỏ được hoàn toàn mùi hôi bò, giúp nước dùng thơm ngon hơn mà không bị tanh.',
  },
];

type StepListProps = {
  steps: string[];
};

const StepList = ({ steps }: StepListProps) => {
  return steps.map((step, index) => (
    <ListItem key={step}>
      <ListItem.Content>
        <StyledText type='Body' color='grey'>
          {`${index + 1}.`} {step}
        </StyledText>
      </ListItem.Content>
    </ListItem>
  ));
};

const FoodInformationScrollView = () => {
  const styles = useStyles();
  const [like, setLike] = useState(false);
  const splitPoint = Math.ceil(INGREDIENT_LIST.length / 2);
  const ingredientList_1 = INGREDIENT_LIST.slice(0, splitPoint);
  const ingredientList_2 = INGREDIENT_LIST.slice(splitPoint);

  const loveIcon = like ? (
    <AntDesign name='heart' style={styles.loveIcon} />
  ) : (
    <AntDesign name='hearto' style={styles.loveIcon} />
  );

  return (
    <BottomSheetScrollView contentContainerStyle={styles.content}>
      <View style={styles.heading}>
        <View style={styles.headingDesc}>
          <StyledText type='Heading_2' color='orange'>
            Phở
          </StyledText>
          <StyledText type='Body' color='grey'>
            Vietnamese traditional breakfast
          </StyledText>
        </View>
        <StyledPressable onPress={() => setLike(prev => !prev)}>{loveIcon}</StyledPressable>
      </View>
      <View style={styles.story}>
        <StyledText type='Heading_3' color='orange'>
          Story
        </StyledText>
        <AudioControl />
        <StyledText type='Body' color='grey'>
          Phở nổi tiếng nhất vẫn là phở Hà Nội. Không biết tự bao giờ, phở đã trở thành món ăn vô
          cùng hấp dẫn mỗi khi đến Hà Nội. Với hương vị độc đáo không có một nơi nào có được, phở Hà
          Nội đã in sâu vào tiềm thức con người, mặc định nó là món ăn ngon nhất. Muốn ăn phở phải
          đến Hà Nội. Vào những năm 1940. phở đã rất nổi tiếng ở Hà Nội. Phở là một món ăn có thể ăn
          vào bất cứ khoảng thời gian nào mà bạn muốn: sáng, trưa, chiều, tối đều được cả. Điểm đặc
          biệt, món phở không ăn kèm, uống kèm bất cứ thứ gì khác. Một bát phở bao gồm: nước dùng,
          bánh phở, gia vị ăn kèm như tiêu, hành lá, lát chanh, ớt… Nước dùng của phở có thể được
          chế biến từ xương bò: xương cục, xương ống và xương vè. Bánh phở phải dai, mềm. Hành lá,
          ớt, tiêu tăng thêm mùi vị của bát phở. Tùy thuộc vào bí quyết nấu mà mỗi nơi lại có mùi vị
          của phở khác nhau.
        </StyledText>
      </View>
      <View>
        <StyledText type='Heading_3' color='orange'>
          Ingredients
        </StyledText>
        <View style={styles.ingredientList}>
          <IngredientVerticalList ingredients={ingredientList_1} />
          <IngredientVerticalList ingredients={ingredientList_2} />
        </View>
      </View>
      <View>
        <StyledText type='Heading_3' color='orange'>
          Steps
        </StyledText>
        <View>{/* <StepList /> */}</View>
      </View>
    </BottomSheetScrollView>
  );
};

type AudioControlProps = {
  playing: boolean;
  onControlPress: () => void;
};
const AudioControl = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const controlIcon = playing ? (
    <Ionicons name='pause' style={styles.audioControlIcon} />
  ) : (
    <Ionicons name='play' style={styles.audioControlIcon} />
  );

  const audioSlider = (
    <Slider
      value={sliderValue}
      onValueChange={setSliderValue}
      maximumValue={50}
      minimumValue={0}
      step={1}
      allowTouchTrack
      orientation='horizontal'
      minimumTrackTintColor={theme.colors.orange}
      maximumTrackTintColor={theme.colors.whiteGrey}
      trackStyle={styles.track}
      thumbStyle={styles.thumb}
      thumbTouchSize={{
        width: STYLES.ICON_SIZE.ICON_SIZE_24,
        height: STYLES.ICON_SIZE.ICON_SIZE_24,
      }}
      style={{
        flex: 1,
      }}
    />
  );

  return (
    <View style={styles.audioControlContainer}>
      <StyledPressable onPress={() => setPlaying(prev => !prev)}>{controlIcon}</StyledPressable>
      {audioSlider}
    </View>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      zIndex: 1,
    },
    backgroundContainer: {
      position: 'relative',
    },
    backIconContainer: {
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      opacity: 0.5,
      position: 'absolute',
      top: STYLES.MARGIN.MARGIN_8,
      left: STYLES.MARGIN.MARGIN_8,
      zIndex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_50,
    },
    backIcon: {
      color: theme.colors.blackGrey,
      fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    },
    background: {
      width: '100%',
      height: 350,
    },
    content: {
      // flex: 1,
      marginHorizontal: STYLES.MARGIN.MARGIN_16,
      // marginTop: STYLES.MARGIN.MARGIN_8,
      gap: STYLES.GAP.GAP_16,
    },
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headingDesc: {},
    loveIcon: {
      color: theme.colors.redPink,
      fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    },
    story: {
      gap: STYLES.GAP.GAP_16,
    },
    audioControlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: STYLES.PADDING.PADDING_8,
      paddingVertical: STYLES.PADDING.PADDING_4,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_15 : STYLES.SHADOW.SHADOW_BLACK_15),
    },
    audioControlIcon: {
      color: theme.colors.orange,
      fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    },
    track: {
      height: 2,
      backgroundColor: theme.colors.orange,
      color: theme.colors.orange,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: theme.colors.orange,
    },
    ingredientList: {
      flexDirection: 'row',
      gap: STYLES.GAP.GAP_8,
      marginVertical: STYLES.MARGIN.MARGIN_8,
    },
  };
});

export default Information;
