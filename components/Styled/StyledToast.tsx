import { makeStyles } from '@rneui/themed';
import Toast, {
  ToastProps,
  ToastConfig,
  ToastConfigParams,
  ToastShowParams,
  BaseToastProps,
  BaseToast,
} from 'react-native-toast-message';
import { TEXT_STYLE_TYPE_MAP, TextTypeStyle } from '@/components/Theme/Text';
import { STYLES } from '@/lib/constants';
import { CircleCheckIcon, CircleCloseIcon } from '../Icon';

export const StyledBaseToast = ({
  style,
  contentContainerStyle,
  text1Style,
  text2Style,
  ...otherProps
}: BaseToastProps) => {
  const styles = useStyles();

  return (
    <BaseToast
      style={[styles.baseContainer, style]}
      contentContainerStyle={[styles.baseContentContainer, contentContainerStyle]}
      text1Style={[styles.baseText1, text1Style]}
      text2Style={[styles.baseText2, text2Style]}
      activeOpacity={0.7}
      {...otherProps}
    />
  );
};

export const StyledSuccessToast = <T,>(props: ToastConfigParams<T>) => {
  const styles = useStyles();
  return (
    <StyledBaseToast
      text1Style={styles.successText1}
      renderLeadingIcon={CircleCheckIcon}
      {...props}
    />
  );
};

export const StyledErrorToast = <T,>(props: ToastConfigParams<T>) => {
  const styles = useStyles();
  return (
    <StyledBaseToast
      text1Style={styles.errorText1}
      renderLeadingIcon={CircleCloseIcon}
      {...props}
    />
  );
};

const config: ToastConfig = {
  'success': props => <StyledSuccessToast {...props} />,
  'error': props => <StyledErrorToast {...props} />,
};

const StyledToast = (props: ToastProps) => <Toast config={config} {...props} />;
StyledToast.show = (options: ToastShowParams) =>
  Toast.show({
    autoHide: true,
    position: 'top',
    visibilityTime: 2000,
    ...options,
  });

const text1Style: TextTypeStyle = {
  fontFamily: 'Inter_600SemiBold',
  fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
  lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_16),
};
const text2Style: TextTypeStyle = TEXT_STYLE_TYPE_MAP.SubInputField;

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    baseContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_8,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      paddingVertical: STYLES.PADDING.PADDING_4,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      borderLeftWidth: 0,
    },
    baseContentContainer: {
      flex: 1,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    baseText1: {
      ...text1Style,
      color: theme.colors.blackGrey,
    },
    baseText2: {
      ...text2Style,
      color: theme.colors.grey,
    },
    successText1: {
      color: theme.colors.green,
    },
    errorText1: {
      color: theme.colors.redPink,
    },
  };
});

export default StyledToast;
