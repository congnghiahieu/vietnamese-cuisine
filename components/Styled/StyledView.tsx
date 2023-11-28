import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { RandomLoading } from './StyledLoading';
import { View, ViewProps } from 'react-native';
import { EmptyList } from './StyledList';
import StyledPressable from './StyledPressable';
import StyledText from './StyledText';
import { useRouter } from 'expo-router';
import { i18n } from '@/lib/i18n';

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
} & ViewProps;

export const HoldingView = ({ style, children, ...otherProps }: ViewProps) => {
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export const LoadingView = ({
  LoadingComponent = RandomLoading,
  ...otherProps
}: LoadingViewProps) => {
  return (
    <HoldingView {...otherProps}>
      <LoadingComponent />
    </HoldingView>
  );
};

type ErrorViewProps = {
  errorMessage?: string;
};

export const ErrorView = ({ errorMessage = i18n.t('other.errorOccur') }: ErrorViewProps) => {
  const router = useRouter();

  return (
    <EmptyList
      title={errorMessage!}
      subField={
        <StyledPressable onPress={() => router.back()}>
          <StyledText
            type='SubInputField'
            color='orange'
            style={{
              textDecorationLine: 'underline',
            }}>
            {i18n.t('other.goBack')}
          </StyledText>
        </StyledPressable>
      }
    />
  );
};
