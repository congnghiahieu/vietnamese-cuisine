import { useState } from 'react';
import { Input, InputProps, makeStyles, useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { EyeIcon } from '@/components/Icon';
import StyledPressable from './StyledPressable';

const BaseInput = (props: InputProps) => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  return (
    <Input
      inputMode='text'
      clearButtonMode='always'
      keyboardAppearance={dT ? 'dark' : 'light'}
      scrollEnabled
      cursorColor={theme.colors.orange}
      selectionColor={theme.colors.orange}
      renderToHardwareTextureAndroid
      lineBreakStrategyIOS='standard'
      {...props}
    />
  );
};

type FormInputProps = InputProps & {
  type: 'normal' | 'password';
};

export const FormInput = (props: FormInputProps) => {
  const {
    containerStyle,
    inputContainerStyle,
    inputStyle,
    errorStyle,
    rightIconContainerStyle,
    leftIconContainerStyle,
    ...otherProps
  } = props;
  const styles = useFormInputStyles();
  const [showSecureText, setShowSecureText] = useState(false);
  const secureTextEntry = props.type === 'normal' || showSecureText ? false : true;

  const rightIcon =
    props.type === 'normal' ? undefined : (
      <StyledPressable
        onPress={() => setShowSecureText(prev => !prev)}
        style={{
          paddingHorizontal: STYLES.PADDING.PADDING_8,
          paddingVertical: STYLES.PADDING.PADDING_4,
        }}>
        <EyeIcon active={showSecureText} />
      </StyledPressable>
    );

  return (
    <BaseInput
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      placeholderTextColor={styles.placeHolder.color}
      inputStyle={[styles.input, inputStyle]}
      errorStyle={[styles.error, errorStyle]}
      rightIconContainerStyle={[styles.iconContainer, rightIconContainerStyle]}
      leftIconContainerStyle={[styles.iconContainer, leftIconContainerStyle]}
      rightIcon={rightIcon}
      secureTextEntry={secureTextEntry}
      {...otherProps}
    />
  );
};

const useFormInputStyles = makeStyles(theme => ({
  container: {
    paddingHorizontal: 0,
    margin: 0,
  },
  inputContainer: {
    padding: 0,
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 1,
    margin: 0,
  },
  placeHolder: {
    color: theme.colors.whiteGrey,
  },
  input: {
    ...TEXT_STYLE_TYPE_MAP.Placeholder,
    color: theme.colors.grey,
  },
  error: {
    ...TEXT_STYLE_TYPE_MAP.Placeholder,
    color: theme.colors.redPink,
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: STYLES.MARGIN.MARGIN_4,
  },
  iconContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    marginVertical: 0,
    height: 'auto',
  },
}));

export const SearchInput = (props: InputProps) => {
  const {
    containerStyle,
    inputContainerStyle,
    inputStyle,
    errorStyle,
    rightIconContainerStyle,
    leftIconContainerStyle,
    ...otherProps
  } = props;
  const styles = useSearchInputStyles();

  return (
    <BaseInput
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      placeholderTextColor={styles.placeHolder.color}
      inputStyle={[styles.input, inputStyle]}
      errorStyle={[styles.error, errorStyle]}
      rightIconContainerStyle={[styles.iconContainer, rightIconContainerStyle]}
      leftIconContainerStyle={[styles.iconContainer, leftIconContainerStyle]}
      {...otherProps}
    />
  );
};

const useSearchInputStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    container: {
      margin: 0,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
      paddingVertical: STYLES.PADDING.PADDING_4,
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
      borderRadius: STYLES.RADIUS.RADIUS_10,
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_8 : STYLES.SHADOW.SHADOW_BLACK_8),
    },
    placeHolder: {
      color: theme.colors.whiteGrey,
    },
    inputContainer: {
      padding: 0,
      margin: 0,
      borderBottomWidth: 0,
      // backgroundColor: 'blue',
    },
    input: {
      ...TEXT_STYLE_TYPE_MAP.Placeholder,
      color: theme.colors.grey,
    },
    error: {
      marginHorizontal: 0,
      marginVertical: 0,
      width: 0,
      height: 0,
    },
    iconContainer: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      paddingRight: 0,
      marginVertical: 0,
      height: 'auto',
    },
  };
});
