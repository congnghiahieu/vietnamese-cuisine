import Svg, { SvgProps, Path } from 'react-native-svg';
import { Button, ButtonProps, makeStyles } from '@rneui/themed';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { STYLES } from '@/lib/constants';

type StyledButtonProps = ButtonProps;

const StyledButton = (props: StyledButtonProps) => {
  const styles = useStyledStyles();
  const {
    buttonStyle,
    containerStyle,
    disabledStyle,
    disabledTitleStyle,
    iconContainerStyle,
    loadingStyle,
    titleStyle,
    ...otherProps
  } = props;

  return (
    <Button
      buttonStyle={[styles.button, buttonStyle]}
      containerStyle={[styles.container, STYLES.SHADOW.SHADOW_ORANGE_15, containerStyle]}
      disabledStyle={[styles.disabled, disabledStyle]}
      disabledTitleStyle={[styles.disabledTitle, disabledTitleStyle]}
      iconContainerStyle={[styles.iconContainer, iconContainerStyle]}
      loadingStyle={[styles.loading, loadingStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      {...otherProps}
    />
  );
};

const useStyledStyles = makeStyles(theme => ({
  container: {
    borderRadius: STYLES.RADIUS.RADIUS_20,
    width: '100%',
    // backgroundColor: 'red',
  },
  button: {
    backgroundColor: theme.colors.orange,
    padding: STYLES.PADDING.PADDING_8 + STYLES.PADDING.PADDING_4,
  },
  disabled: {
    backgroundColor: theme.colors.whiteGrey,
  },
  disabledTitle: {
    ...TEXT_STYLE_TYPE_MAP.Heading_4,
    color: theme.colors.blackGrey,
  },
  iconContainer: {},
  loading: {},
  titleStyle: {
    ...TEXT_STYLE_TYPE_MAP.Heading_4,
    color: theme.colors.white,
    marginHorizontal: STYLES.MARGIN.MARGIN_4,
  },
}));

export const GoogleButton = (props: StyledButtonProps) => {
  const styles = useGoogleButtonStyles();

  return (
    <StyledButton
      buttonStyle={styles.button}
      containerStyle={[styles.container]}
      disabledStyle={styles.disabled}
      disabledTitleStyle={styles.disabledTitle}
      icon={<GoogleIcon />}
      title='Google'
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

const GoogleIcon = (props: SvgProps) => (
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

const useGoogleButtonStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const color = dT ? theme.colors.white : theme.colors.black;

  return {
    container: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      borderRadius: STYLES.RADIUS.RADIUS_20,
    },
    button: {
      backgroundColor: 'transparent',
      padding: STYLES.PADDING.PADDING_8 + STYLES.PADDING.PADDING_4,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      borderWidth: 1,
      borderColor: color,
    },
    disabled: {
      backgroundColor: 'transparent',
    },
    disabledTitle: {
      ...TEXT_STYLE_TYPE_MAP.Heading_4,
      color: theme.colors.whiteGrey,
    },
    iconContainer: {},
    loading: {},
    titleStyle: {
      color: color,
    },
  };
});

export default StyledButton;
