import 'react-native-get-random-values';
import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Slot, useFocusEffect } from 'expo-router';
import { ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import {
  Theme as NavigationTheme,
  ThemeProvider as DefaultNavigationThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { theme } from '@/components/Theme/theme';
import { FontsLoader } from '@/components/Theme/Text';
import StyledToast from '@/components/Styled/StyledToast';
import { useSettingStates } from '@/states/setting';
import { AuthProvider } from '@/context/AuthContext';
import { i18n } from '@/lib/i18n';

import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

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
                <Slot />
              </AuthProvider>
            </NavigationThemeProvider>
            <StyledToast />
          </SettingsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </FontsLoader>
  );
}
