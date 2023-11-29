import 'react-native-get-random-values';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, useFocusEffect } from 'expo-router';
import { ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import {
  Theme as NavigationTheme,
  ThemeProvider as DefaultNavigationThemeProvider,
  useIsFocused,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { theme } from '@/components/Theme/theme';
import { FontsLoader } from '@/components/Theme/Text';
import StyledToast from '@/components/Styled/StyledToast';
import { useSettingStates } from '@/states/setting';
import { AuthProvider } from '@/context/AuthContext';
import { i18n } from '@/lib/i18n';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const NavigationThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  const navigationTheme: NavigationTheme = {
    dark: dT,
    colors: {
      primary: theme.colors.orange,
      background: theme.colors.background,
      text: theme.colors.blackGrey,
      card: theme.colors.white,
      border: dT ? theme.colors.blackGrey : theme.colors.whiteGrey,
      notification: theme.colors.orange,
    },
  };
  return (
    <DefaultNavigationThemeProvider value={navigationTheme}>
      {children}
    </DefaultNavigationThemeProvider>
  );
};

const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const { darkMode, language } = useSettingStates();
  const { setMode } = useThemeMode();

  useFocusEffect(
    useCallback(() => {
      if (darkMode) setMode('dark');
      if (i18n.locale != language) {
        i18n.locale = language;
      }
    }, []),
  );

  return children;
};

const StackLayout = () => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const checkAlreadyOnboarded = async () => {
    const onboarded = await AsyncStorage.getItem('Vietnamese Cuisine Onboard');
    console.log(onboarded);
    setShowOnboarding(onboarded === 'true' ? false : true);
    setIsLoading(false);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    checkAlreadyOnboarded();
  }, []);

  if (isLoading) {
    return null;
  }

  console.log(showOnboarding);

  return (
    <>
      <StatusBar barStyle={dT ? 'light-content' : 'dark-content'} />
      <Stack
        initialRouteName={showOnboarding ? '(onboard)' : '(sidebar)'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='(sidebar)' />
        <Stack.Screen
          name='login'
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name='register'
          options={{
            title: 'Register',
          }}
        />
        <Stack.Screen
          name='(onboard)'
          options={{
            title: 'Onboard',
          }}
        />
        <Stack.Screen
          name='information/[title]'
          options={{
            title: 'Information',
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // retry: 3,
      retryOnMount: true,
      // staleTime: 0,
      // gcTime: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});

// Set up react query refetch on reconnect
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  return (
    <FontsLoader>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SettingsProvider>
            <NavigationThemeProvider>
              <AuthProvider>
                <StackLayout />
              </AuthProvider>
            </NavigationThemeProvider>
            <StyledToast />
          </SettingsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </FontsLoader>
  );
}
