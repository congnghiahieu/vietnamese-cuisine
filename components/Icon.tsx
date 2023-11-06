import { Feather, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import StyledPressable from './Styled/StyledPressable';

export const ArrowIcon = () => {
  const styles = useStyles();
  return <Feather name='arrow-right' style={styles.arrowIcon} />;
};

export const MenuIcon = () => {
  const styles = useStyles();

  const Line = ({ width }: { width: number }) => <View style={[styles.menuLine, { width }]} />;

  return (
    <View style={styles.menuLineContainer}>
      <Line width={20} />
      <Line width={16} />
      <Line width={12} />
    </View>
  );
};

type EyeIconProps = {
  onPress: () => void;
  show: boolean;
};

export const EyeIcon = (props: EyeIconProps) => {
  const styles = useStyles();
  const icon = props.show ? (
    <Ionicons style={styles.eyeIcon} name='eye-outline' />
  ) : (
    <Ionicons style={styles.eyeIcon} name='eye-off-outline' />
  );

  return (
    <StyledPressable
      onPress={props.onPress}
      style={{
        paddingHorizontal: STYLES.PADDING.PADDING_8,
        paddingVertical: STYLES.PADDING.PADDING_4,
      }}>
      {icon}
    </StyledPressable>
  );
};

const useStyles = makeStyles(theme => ({
  arrowIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    color: theme.colors.white,
  },
  menuLineContainer: {
    alignItems: 'flex-start',
    gap: STYLES.GAP.GAP_4,
  },
  menuLine: {
    height: 2,
    backgroundColor: theme.colors.orange,
    borderRadius: STYLES.RADIUS.RADIUS_10,
  },
  eyeIcon: {
    fontSize: STYLES.ICON_SIZE.ICON_SIZE_24,
    color: theme.colors.blackGrey,
  },
}));
