import { View } from 'react-native';
import { Text, TextProps } from '@rneui/themed';
import { makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { i18n } from '@/lib/i18n';

export type StyledTextProps = TextProps & {
  lengthLimit?: number;
};
const StyledText = (props: StyledTextProps) => {
  const { children, lengthLimit, ...otherProps } = props;
  let newChildren = children;
  if (Array.isArray(newChildren)) {
    newChildren = newChildren.join(' ');
  }
  if (lengthLimit && typeof newChildren === 'string' && newChildren.length > lengthLimit) {
    newChildren = newChildren.slice(0, lengthLimit) + '...';
  }

  return <Text {...otherProps}>{newChildren}</Text>;
};

export const ContinueWithText = () => {
  const styles = useStyles();
  const Line = () => <View style={styles.line} />;

  return (
    <View style={styles.continueContainer}>
      <Line />
      <StyledText style={styles.continueText}>{i18n.t('other.continueWith')}</StyledText>
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
