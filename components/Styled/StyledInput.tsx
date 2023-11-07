import { useState } from 'react';
import { Input, InputProps, makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { EyeIcon } from '@/components/Icon';
import StyledPressable from './StyledPressable';

type FormInputProps = InputProps & {
  type: 'normal' | 'password';
};

export const FormInput = (props: FormInputProps) => {
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
        {/* <EyeIcon active={showSecureText} /> */}
        {EyeIcon({
          active: showSecureText,
        })}
      </StyledPressable>
    );

  return (
    <Input
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      placeholderTextColor={styles.input.color}
      inputStyle={styles.input}
      errorStyle={styles.error}
      rightIconContainerStyle={styles.iconContainer}
      leftIconContainerStyle={styles.iconContainer}
      rightIcon={rightIcon}
      secureTextEntry={secureTextEntry}
      {...props}
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
  const styles = useSearchInputStyles();

  return (
    <Input
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      placeholderTextColor={styles.input.color}
      inputStyle={styles.input}
      errorStyle={styles.error}
      rightIconContainerStyle={styles.iconContainer}
      leftIconContainerStyle={styles.iconContainer}
      {...props}
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
      ...(dT ? STYLES.SHADOW.SHADOW_WHITE_15 : STYLES.SHADOW.SHADOW_BLACK_15),
    },
    inputContainer: {
      padding: 0,
      margin: 0,
      borderBottomWidth: 0,
      // backgroundColor: 'blue',
    },
    input: {
      ...TEXT_STYLE_TYPE_MAP.Placeholder,
      color: theme.colors.whiteGrey,
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
