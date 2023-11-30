import { Pressable, View } from 'react-native';
import { Header, makeStyles, useTheme } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { STYLES } from '@/lib/constants';
import { AvatarIcon, MenuIcon, RetweetIcon, SoundIcon } from '@/components/Icon';
import StyledPressable from './StyledPressable';
import StyledText from './StyledText';
import { dismissKeyboard } from '@/lib/utils';
import Animated, {
  useSharedValue,
  withTiming,
  withSequence,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useSound } from '@/hooks/useSound';
import { useRef } from 'react';

type SidebarHeaderProps = {
  title: string | undefined;
};

const StyledHeader = ({ title }: SidebarHeaderProps) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  // const onAvatarPress = () => router.push('/(app)/(sidebar)/profile');
  const onMenuPress = () => navigation.dispatch(DrawerActions.openDrawer());
  const onAvatarPress = () => router.push('/(app)/(sidebar)/(protected)/profile');

  return (
    <Header
      onStartShouldSetResponder={dismissKeyboard}
      statusBarProps={{
        animated: true,
        // hidden: true,
      }}
      backgroundColor={theme.colors.background}
      barStyle={dT ? 'light-content' : 'dark-content'}
      containerStyle={{
        // paddingHorizontal: STYLES.PADDING.PADDING_16,
        // paddingTop: STYLES.PADDING.PADDING_16,
        // paddingBottom: STYLES.PADDING.PADDING_8,
        padding: STYLES.PADDING.PADDING_16,
        borderBottomWidth: 0,
        borderBottomColor: dT ? theme.colors.blackGrey : theme.colors.whiteGrey,
        // backgroundColor: 'red',
      }}
      leftComponent={
        <StyledPressable
          onPress={() => {
            dismissKeyboard();
            onMenuPress();
          }}
          style={{
            paddingVertical: STYLES.PADDING.PADDING_8,
            paddingRight: STYLES.PADDING.PADDING_32,
            paddingLeft: 0,
          }}>
          <MenuIcon />
        </StyledPressable>
      }
      centerComponent={
        <StyledText type='Heading_2' color='orange'>
          {title || 'Home'}
        </StyledText>
      }
      rightComponent={
        <StyledPressable
          onPress={() => {
            dismissKeyboard();
            onAvatarPress();
          }}
          style={{ padding: 0 }}>
          <AvatarIcon />
        </StyledPressable>
      }
    />
  );
};

type GameHeaderRightProps = {
  soundOn: boolean;
  onSoundPress: () => void;
  onResetPress: () => void;
};

export const GameHeaderRight = ({ soundOn, onSoundPress, onResetPress }: GameHeaderRightProps) => {
  const styles = useStyles();

  return (
    <View style={styles.headerRightContainer}>
      <StyledPressable onPress={onSoundPress} style={styles.pressable}>
        <SoundIcon active={soundOn} />
      </StyledPressable>
      <AnimatedResetIcon onResetPress={onResetPress} />
    </View>
  );
};

export const AnimatedResetIcon = ({ onResetPress }: Pick<GameHeaderRightProps, 'onResetPress'>) => {
  const styles = useStyles();
  const pressTime = useRef<number>(0);
  const { playSound } = useSound(require('../../assets/sound/wind-sound.mp3'));
  const duration = 200;
  const easing = Easing.ease;
  const scaleFrom = 1;
  const scaleTo = 1.6;
  const angle = 360;
  const initalScale = useSharedValue(1);
  const initialRotate = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: initalScale.value,
      },
      {
        rotateZ: `${initialRotate.value}deg`,
      },
    ],
  }));

  const onAnimate = () => {
    initalScale.value = withSequence(
      withTiming(scaleTo, {
        duration,
        easing,
      }),
      withTiming(scaleFrom, {
        duration,
        easing,
      }),
    );

    initialRotate.value = withTiming(-angle * pressTime.current, {
      duration,
      easing,
    });
  };

  const handleResetPress = () => {
    playSound();

    pressTime.current += 1;
    onAnimate();

    onResetPress();
  };
  return (
    <Animated.View style={[animatedStyle]}>
      <StyledPressable onPress={handleResetPress} style={styles.pressable}>
        <RetweetIcon />
      </StyledPressable>
    </Animated.View>
  );
};

const useStyles = makeStyles(theme => ({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: STYLES.GAP.GAP_16,
  },
  pressable: {
    // backgroundColor: 'red',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
}));

export default StyledHeader;
