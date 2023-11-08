import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from '@expo/vector-icons';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import Svg, { SvgProps, Path, G } from 'react-native-svg';

export const ArrowRightIcon = () => {
  const styles = useStyles();
  return <Feather name='arrow-right' style={[styles.baseIcon]} />;
};

export const ChevronLeftIcon = () => {
  const styles = useStyles();
  return <MaterialIcons name='chevron-left' style={[styles.baseIcon, styles.blackGrey]} />;
};

export const ChevronRightIcon = () => {
  const styles = useStyles();
  return <MaterialIcons name='chevron-right' style={[styles.baseIcon, styles.orange]} />;
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

export const AvatarIcon = () => {
  const styles = useStyles();
  return (
    <View style={styles.avatarIcon}>
      <AntDesign name='user' style={[styles.baseIcon, styles.orange]} />
    </View>
  );
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

export const HeartIcon = ({ active }: ActiveIconProps) => {
  const styles = useStyles();
  return active ? (
    <AntDesign name='heart' style={[styles.baseIcon, styles.redPink]} />
  ) : (
    <AntDesign name='hearto' style={[styles.baseIcon, styles.redPink]} />
  );
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
}));
