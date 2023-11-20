import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { RandomLoading } from './StyledLoading';
import { View } from 'react-native';
import { EmptyList } from './StyledList';
import StyledPressable from './StyledPressable';
import StyledText from './StyledText';
import { useRouter } from 'expo-router';

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

type LoadingViewProps = {
  LoadingComponent?: () => React.ReactNode;
};

export const LoadingView = ({ LoadingComponent = RandomLoading }: LoadingViewProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoadingComponent />
    </View>
  );
};

type ErrorViewProps = {
  errorMessage?: string;
};
export const ErrorView = ({ errorMessage = 'Some errors occurred' }: ErrorViewProps) => {
  const router = useRouter();

  return (
    <EmptyList
      title={errorMessage}
      subField={
        <StyledPressable onPress={() => router.back()}>
          <StyledText
            type='SubInputField'
            color='orange'
            style={{
              textDecorationLine: 'underline',
            }}>
            Go back
          </StyledText>
        </StyledPressable>
      }
    />
  );
};
