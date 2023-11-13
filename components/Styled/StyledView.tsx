import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

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

export const SafeView = ({ children, style, ...otherProps }: SafeAreaViewProps) => {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]} mode='padding' {...otherProps}>
      {children}
    </SafeAreaView>
  );
};
