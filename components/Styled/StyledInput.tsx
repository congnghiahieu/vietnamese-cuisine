import { useState } from 'react';
import { Input, InputProps, makeStyles } from '@rneui/themed';
import { STYLES } from '@/lib/constants';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { EyeIcon } from '@/components/Icon';

type StyledInputType = {
  type: 'normal' | 'password';
};
type StyledInputProps = InputProps & StyledInputType;

const StyledInput = (props: StyledInputProps) => {
  const styles = useStyles();
  const [showSecureText, setShowSecureText] = useState(false);
  const secureTextEntry = props.type === 'normal' || showSecureText ? false : true;

  const rightIcon =
    props.type === 'normal' ? undefined : (
      <EyeIcon show={showSecureText} onPress={() => setShowSecureText(prev => !prev)} />
    );

  return (
    <Input
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      errorStyle={styles.error}
      rightIconContainerStyle={styles.rightIconContainer}
      rightIcon={rightIcon}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
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
  rightIconContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    marginVertical: 0,
    height: 'auto',
  },
}));

export default StyledInput;
