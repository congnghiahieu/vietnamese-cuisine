import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import Svg, { SvgProps, Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  Easing,
  withTiming,
  withDelay,
  withRepeat,
} from 'react-native-reanimated';
import { forwardRef, useEffect, useState } from 'react';
import { useAppearSoundEffect } from '@/hooks/useSound';
import { Audio } from 'expo-av';

export const SidebarHomeIcon = () => {
  const styles = useStyles();
  return <Ionicons name='home' style={[styles.baseIcon]} />;
};
export const ArrowRightIcon = () => {
  const styles = useStyles();
  return <Feather name='arrow-right' style={[styles.baseIcon]} />;
};

export const ArrowLeftIcon = () => {
  const styles = useStyles();
  return <Feather name='arrow-left' style={[styles.baseIcon, styles.blackGrey]} />;
};

export const ChevronLeftIcon = () => {
  const styles = useStyles();
  return <MaterialIcons name='chevron-left' style={[styles.baseIcon, styles.blackGrey, {}]} />;
};

export const ChevronRightIcon = () => {
  const styles = useStyles();
  return <MaterialIcons name='chevron-right' style={[styles.baseIcon, styles.orange]} />;
};

export const CloseIcon = () => {
  const styles = useStyles();
  return <AntDesign name='close' style={[styles.baseIcon, styles.redPink]} />;
};

export const PlayCircleIcon = () => {
  const styles = useStyles();
  return <AntDesign name='playcircleo' style={[styles.baseIcon]} />;
};

export const SearchIcon = () => {
  const styles = useStyles();
  return <Ionicons name='search' style={[styles.baseIcon, styles.orange]} />;
};

export const LanguageIcon = () => {
  const styles = useStyles();
  return <Entypo name='language' style={[styles.baseIcon, styles.orange]} />;
};

export const GiftIcon = () => {
  const styles = useStyles();
  return <MaterialCommunityIcons name='gift' style={styles.baseIcon} />;
};

export const CircleCheckIcon = () => {
  const styles = useStyles();
  return <AntDesign name='checkcircle' style={[styles.baseIcon, styles.green]} />;
};

export const CircleCloseIcon = () => {
  const styles = useStyles();
  return <AntDesign name='closecircle' style={[styles.baseIcon, styles.redPink]} />;
};

export const CircleExclamationIcon = () => {
  const styles = useStyles();
  return <AntDesign name='exclamationcircle' style={[styles.baseIcon, styles.yellow]} />;
};

export const HeartDislikeIcon = (props: SvgProps) => (
  <Svg
    width={STYLES.ICON_SIZE.ICON_SIZE_24}
    height={STYLES.ICON_SIZE.ICON_SIZE_24}
    viewBox='0 0 48 48'
    {...props}>
    <Path
      fill='#F44336'
      d='M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z'
    />
    <Path fill='#37474F' d='M3.563 6.396L6.39 3.568l37.966 37.966l-2.828 2.828z' />
  </Svg>
);

export const GoogleIcon = (props: SvgProps) => (
  <Svg
    x='0px'
    y='0px'
    width={STYLES.ICON_SIZE.ICON_SIZE_24}
    height={STYLES.ICON_SIZE.ICON_SIZE_24}
    viewBox='0 0 48 48'
    {...props}>
    <Path
      fill='#fbc02d'
      d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
    />
    <Path
      fill='#e53935'
      d='M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
    />
    <Path
      fill='#4caf50'
      d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
    />
    <Path
      fill='#1565c0'
      d='M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
    />
  </Svg>
);

export const ResetIcon = () => {
  const styles = useStyles();
  return (
    <Svg
      width={STYLES.ICON_SIZE.ICON_SIZE_36}
      height={STYLES.ICON_SIZE.ICON_SIZE_36}
      color={styles.green.color}>
      <Path
        fill='currentColor'
        d='M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z'
      />
    </Svg>
  );
};

export const TwitterIcon = () => {
  const styles = useStyles();
  return (
    <FontAwesome5
      name='twitter'
      style={[
        styles.baseIcon,
        {
          color: '#1D9BF0',
        },
      ]}
    />
  );
};

export const GithubIcon = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  const color = dT ? theme.colors.white : theme.colors.black;
  return (
    <AntDesign
      name='github'
      style={[
        styles.baseIcon,
        {
          color,
        },
      ]}
    />
  );
};

export const FacebookIcon = () => {
  const styles = useStyles();
  return (
    <FontAwesome5
      name='facebook'
      style={[
        styles.baseIcon,
        {
          color: '#1877F2',
        },
      ]}
    />
  );
};

export const PostIcon = (props: SvgProps) => {
  const styles = useStyles();

  return (
    <Svg
      width={STYLES.ICON_SIZE.ICON_SIZE_24}
      height={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={styles.whiteGrey.color}
      {...props}
      viewBox='0 0 24 24'>
      <G fill='none' stroke='currentColor' stroke-width='1.5'>
        <Path d='M2.906 17.505L5.337 3.718a2 2 0 0 1 2.317-1.623L19.472 4.18a2 2 0 0 1 1.622 2.317l-2.431 13.787a2 2 0 0 1-2.317 1.623L4.528 19.822a2 2 0 0 1-1.622-2.317Z' />
        <Path
          stroke-linecap='round'
          d='m8.929 6.382l7.879 1.389m-8.574 2.55l7.879 1.39M7.54 14.26l4.924.869'
        />
      </G>
    </Svg>
  );
};

export const SendIcon = (props: SvgProps) => {
  const styles = useStyles();
  return (
    <Svg
      width={STYLES.ICON_SIZE.ICON_SIZE_24}
      height={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={styles.baseIcon.color}
      {...props}
      viewBox='0 0 24 24'>
      <G fill='none'>
        <Path d='M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z' />
        <Path
          fill='currentColor'
          d='M20.235 5.686c.432-1.195-.726-2.353-1.921-1.92L3.709 9.048c-1.199.434-1.344 2.07-.241 2.709l4.662 2.699l4.163-4.163a1 1 0 0 1 1.414 1.414L9.544 15.87l2.7 4.662c.638 1.103 2.274.957 2.708-.241l5.283-14.605Z'
        />
      </G>
    </Svg>
  );
};

export const SignOutIcon = (props: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      width={STYLES.ICON_SIZE.ICON_SIZE_24}
      height={STYLES.ICON_SIZE.ICON_SIZE_24}
      color={theme.colors.white}
      viewBox='0 0 24 24'
      {...props}>
      <Path
        fill='currentColor'
        d='M17 2H7C5.3 2 4 3.3 4 5v6h8.6l-2.3-2.3c-.4-.4-.4-1 0-1.4c.4-.4 1-.4 1.4 0l4 4c.4.4.4 1 0 1.4l-4 4c-.4.4-1 .4-1.4 0c-.4-.4-.4-1 0-1.4l2.3-2.3H4v6c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3z'
      />
    </Svg>
  );
};

export const AvatarIcon = () => {
  const styles = useStyles();
  return (
    <View style={styles.avatarIcon}>
      <AntDesign name='user' style={[styles.baseIcon, styles.orange]} />
    </View>
  );
};

export const AvatarIconWithCamera = () => {
  const styles = useStyles();
  return (
    <View style={styles.avatarWithCameraContainer}>
      <View style={[styles.avatarIcon, { position: 'relative' }]}>
        <AntDesign
          name='user'
          style={[
            styles.baseIcon,
            styles.orange,
            {
              fontSize: STYLES.ICON_SIZE.ICON_SIZE_36 * 2,
            },
          ]}
        />
        <View style={[styles.avatarIcon, styles.cameraIcon]}>
          <AntDesign
            name='camera'
            style={[
              styles.baseIcon,
              styles.orange,
              {
                fontSize: (STYLES.ICON_SIZE.ICON_SIZE_24 / 6) * 3,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export const ImageIcon = () => {
  const styles = useStyles();
  return <Ionicons name='images-outline' style={[styles.baseIcon, styles.green]} />;
};

export const PencilPostIcon = () => {
  const styles = useStyles();
  return <Feather name='edit' style={[styles.baseIcon]} />;
};

export const PencilEditIcon = () => {
  const styles = useStyles();
  return <MaterialCommunityIcons name='pencil' style={[styles.baseIcon, styles.green]} />;
};

export const LockIcon = () => {
  const styles = useStyles();
  return <Entypo name='lock' style={[styles.baseIcon, styles.green]} />;
};

export const CommentIcon = () => {
  const styles = useStyles();
  return <FontAwesome5 name='comments' style={[styles.baseIcon, styles.blackGrey]} />;
};

const Line = ({ width }: { width: number }) => {
  const styles = useStyles();
  return (
    <View
      style={[
        {
          width,
        },
        styles.line,
      ]}
    />
  );
};

export const MenuIcon = () => {
  const styles = useStyles();
  return (
    <View style={styles.menuIcon}>
      <Line width={20} />
      <Line width={16} />
      <Line width={12} />
    </View>
  );
};

type ActiveIconProps = {
  active: boolean;
};
export const EyeIcon = ({ active }: ActiveIconProps) => {
  const styles = useStyles();
  return active ? (
    <Ionicons style={[styles.baseIcon, styles.blackGrey]} name='eye-outline' />
  ) : (
    <Ionicons style={[styles.baseIcon, styles.blackGrey]} name='eye-off-outline' />
  );
};

export const HeartNoFillIcon = () => {
  const styles = useStyles();
  return <AntDesign name='hearto' style={[styles.baseIcon, styles.redPink]} />;
};

export const HeartFillIcon = () => {
  const styles = useStyles();
  return <AntDesign name='heart' style={[styles.baseIcon, styles.redPink]} />;
};

const AnimatedHeartFillIconComponent = Animated.createAnimatedComponent(forwardRef(HeartFillIcon));
const AnimatedHeartFillIcon = () => {
  const easing = Easing.elastic(2);
  const duration = 300;
  const rotateDuration = 50;
  const rotateRepeated = 5;
  const scaleFrom = 1;
  const scaleTo = 1.4;
  const angle = 8;
  const initialRotate = useSharedValue(0);
  const initialScale = useSharedValue(scaleFrom);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: initialScale.value,
      },
      {
        rotateZ: `${initialRotate.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    initialScale.value = withSequence(
      withTiming(scaleTo, {
        duration,
        easing,
      }),
      withDelay(
        rotateRepeated * rotateDuration,
        withTiming(scaleFrom, {
          duration,
          easing,
        }),
      ),
    );
    initialRotate.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-angle, { duration: rotateDuration, easing }),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(angle, {
          duration: rotateDuration,
          easing,
        }),
        7,
        true,
      ),
      withTiming(0, { duration: rotateDuration / 2, easing }),
    );
  }, []);

  useAppearSoundEffect(require('../assets/sound/love-sound.mp3'));

  return <AnimatedHeartFillIconComponent style={animatedStyle} />;
};
export const HeartIcon = ({ active }: ActiveIconProps) => {
  return active ? <AnimatedHeartFillIcon /> : <HeartNoFillIcon />;
};

export const SoundOffIcon = () => {
  const styles = useStyles();
  return <Entypo name='sound-mute' style={[styles.baseIcon, styles.largeIcon, styles.orange]} />;
};

export const SoundOnIcon = () => {
  const styles = useStyles();
  return <Entypo name='sound' style={[styles.baseIcon, styles.largeIcon, styles.orange]} />;
};

const AnimatedSoundOnIconComponent = Animated.createAnimatedComponent(forwardRef(SoundOnIcon));
const AnimatedSoundOnIcon = () => {
  const easing = Easing.elastic(2);
  const duration = 200;
  const scaleFrom = 1;
  const scaleTo = 1.4;
  const initialScale = useSharedValue(scaleFrom);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: initialScale.value,
      },
    ],
  }));

  useEffect(() => {
    initialScale.value = withSequence(
      withTiming(scaleTo, {
        duration,
        easing,
      }),
      withTiming(scaleFrom, {
        duration,
        easing,
      }),
    );
  }, []);

  useAppearSoundEffect(require('../assets/sound/on-sound.mp3'));

  return <AnimatedSoundOnIconComponent style={animatedStyle} />;
};
export const SoundIcon = ({ active }: ActiveIconProps) => {
  return active ? <AnimatedSoundOnIcon /> : <SoundOffIcon />;
};

export const AudioControlIcon = ({ active }: ActiveIconProps) => {
  const styles = useStyles();
  return active ? (
    <Ionicons name='pause' style={[styles.baseIcon, styles.orange]} />
  ) : (
    <Ionicons name='play' style={[styles.baseIcon, styles.orange]} />
  );
};

export const DarkModeIcon = ({ active }: ActiveIconProps) => {
  const styles = useStyles();
  return active ? (
    <Ionicons name='ios-cloudy-night-outline' style={[styles.baseIcon, styles.orange]} />
  ) : (
    <Ionicons name='sunny-outline' style={[styles.baseIcon, styles.orange]} />
  );
};

export const NotificationsIcon = ({ active }: ActiveIconProps) => {
  const styles = useStyles();
  return active ? (
    <Ionicons name='notifications' style={[styles.baseIcon, styles.orange]} />
  ) : (
    <Ionicons name='notifications-off' style={[styles.baseIcon, styles.orange]} />
  );
};

const useStyles = makeStyles(theme => ({
  baseIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    color: theme.colors.white,
  },
  largeIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_36,
  },
  blackGrey: {
    color: theme.colors.blackGrey,
  },
  grey: {
    color: theme.colors.whiteGrey,
  },
  whiteGrey: {
    color: theme.colors.whiteGrey,
  },
  orange: {
    color: theme.colors.orange,
  },
  redPink: {
    color: theme.colors.redPink,
  },
  green: {
    color: theme.colors.green,
  },
  yellow: {
    color: theme.colors.yellow,
  },
  white: {
    color: theme.colors.white,
  },
  black: {
    color: theme.colors.black,
  },
  line: {
    height: 2,
    backgroundColor: theme.colors.orange,
    borderRadius: STYLES.RADIUS.RADIUS_10,
  },
  menuIcon: {
    alignItems: 'flex-start',
    gap: STYLES.GAP.GAP_4,
  },
  avatarIcon: {
    borderRadius: 50,
    borderColor: theme.colors.orange,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: STYLES.PADDING.PADDING_4,
  },
  avatarWithCameraContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    zIndex: 1,
  },
}));
