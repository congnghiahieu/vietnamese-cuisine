import { Feather, Ionicons, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

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
}));
