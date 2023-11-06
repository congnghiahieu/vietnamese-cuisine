import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

export const KeyboardView = ({ children, style, ...otherProps }: KeyboardAwareScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      style={style}
      enableOnAndroid
      keyboardOpeningTime={100}
      {...otherProps}>
      {children}
    </KeyboardAwareScrollView>
  );
};
