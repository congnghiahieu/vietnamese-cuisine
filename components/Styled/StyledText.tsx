import { View } from 'react-native';
import { Text, TextProps } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

export type StyledTextProps = TextProps;
const StyledText = (props: StyledTextProps) => {
  const { children, ...otherProps } = props;
  return <Text {...otherProps}>{children}</Text>;
};

export const ContinueWithText = () => {
  const styles = useStyles();
  const Line = () => <View style={styles.line} />;

  return (
    <View style={styles.continueContainer}>
      <Line />
      <StyledText style={styles.continueText}>or continue with</StyledText>
      <Line />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  continueContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: STYLES.GAP.GAP_8,
  },
  line: {
    height: 1,
    width: STYLES.ICON_SIZE.ICON_SIZE_36 * 2,
    backgroundColor: theme.colors.whiteGrey,
  },
  continueText: {
    fontFamily: 'Inter_400Regular',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_12,
    color: theme.colors.grey,
  },
}));
export default StyledText;
