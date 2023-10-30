import { View } from 'react-native';
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

const StyledBackground = ({ style }: BottomSheetBackgroundProps) => {
  const styles = useStyles();

  return <View style={[styles.container, style]} />;
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  return {
    container: {
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
  };
});

export default StyledBackground;
