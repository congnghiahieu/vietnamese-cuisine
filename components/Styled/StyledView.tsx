import { Keyboard, View, ViewProps } from 'react-native';
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
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
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

export const dismissKeyboard = () => {
  Keyboard.dismiss();
  return false;
};

export const KeyboardDismissViewFCHOC = <T extends ViewProps>(
  ViewComponent: React.FunctionComponent<T>,
) => {
  return (props: T) => <ViewComponent onStartShouldSetResponder={dismissKeyboard} {...props} />;
};

export const KeyboardDismissView = ({ children, ...otherProps }: ViewProps) => {
  return (
    <View onStartShouldSetResponder={dismissKeyboard} {...otherProps}>
      {children}
    </View>
  );
};
