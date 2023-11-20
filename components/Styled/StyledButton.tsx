import { Button, ButtonProps, makeStyles, useTheme } from '@rneui/themed';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { STYLES } from '@/lib/constants';
import { FacebookIcon, GithubIcon, GoogleIcon, TwitterIcon } from '@/components/Icon';

type StyledButtonProps = ButtonProps;

export const SolidButton = (props: StyledButtonProps) => {
  const styles = useSolidStyles();
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
      containerStyle={[styles.container, containerStyle]}
      disabledStyle={[styles.disabled, disabledStyle]}
      disabledTitleStyle={[styles.disabledTitle, disabledTitleStyle]}
      iconContainerStyle={[styles.iconContainer, iconContainerStyle]}
      loadingStyle={[styles.loading, loadingStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      {...otherProps}
    />
  );
};

const useSolidStyles = makeStyles(theme => ({
  container: {
    borderRadius: STYLES.RADIUS.RADIUS_20,
    ...STYLES.SHADOW.SHADOW_ORANGE_4,
    backgroundColor: theme.colors.orange,
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

export const OutlineButton = (props: StyledButtonProps) => {
  const styles = useOutlineStyles();
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
      containerStyle={[styles.container, containerStyle]}
      disabledStyle={[styles.disabled, disabledStyle]}
      disabledTitleStyle={[styles.disabledTitle, disabledTitleStyle]}
      iconContainerStyle={[styles.iconContainer, iconContainerStyle]}
      loadingStyle={[styles.loading, loadingStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      {...otherProps}
    />
  );
};

const useOutlineStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';
  const color = theme.colors.orange;

  return {
    container: {
      borderRadius: STYLES.RADIUS.RADIUS_20,
      backgroundColor: 'transparent',
      ...STYLES.SHADOW.NO_SHADOW,
    },
    button: {
      backgroundColor: 'transparent',
      padding: STYLES.PADDING.PADDING_8 + STYLES.PADDING.PADDING_4,
      borderRadius: STYLES.RADIUS.RADIUS_20,
      borderWidth: 1,
      borderColor: color,
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
      color: color,
      marginHorizontal: STYLES.MARGIN.MARGIN_4,
    },
  };
});

export const GoogleButton = (props: StyledButtonProps) => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  const color = dT ? theme.colors.white : theme.colors.black;

  return (
    <OutlineButton
      icon={<GoogleIcon />}
      title='Google'
      buttonStyle={{
        borderColor: color,
      }}
      titleStyle={{
        color,
      }}
      {...props}
    />
  );
};

export const FaceBookButton = (props: StyledButtonProps) => {
  const color = '#1877F2';

  return (
    <OutlineButton
      icon={<FacebookIcon />}
      title='Facebook'
      buttonStyle={{
        borderColor: color,
      }}
      titleStyle={{
        color,
      }}
      {...props}
    />
  );
};

export const GithubButton = ({ titleStyle, buttonStyle, ...otherProps }: StyledButtonProps) => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  const color = dT ? theme.colors.white : theme.colors.black;

  return (
    <OutlineButton
      icon={<GithubIcon />}
      title='Github'
      buttonStyle={[
        {
          borderColor: color,
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color,
        },
        titleStyle,
      ]}
      {...otherProps}
    />
  );
};
export const TwitterButton = (props: StyledButtonProps) => {
  const color = '#1D9BF0';

  return (
    <OutlineButton
      icon={<TwitterIcon />}
      title='X'
      buttonStyle={{
        borderColor: color,
      }}
      titleStyle={{
        color,
      }}
      {...props}
    />
  );
};
