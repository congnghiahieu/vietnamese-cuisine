import React, { useCallback, useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  Stack,
  useFocusEffect,
  useNavigation,
  useRootNavigation,
  useRootNavigationState,
} from 'expo-router';
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

const DarkThemeProvider = ({ children }: React.PropsWithChildren) => {
  const { darkMode } = useSettingStates();
  const { setMode } = useThemeMode();

  useFocusEffect(
    useCallback(() => {
      console.log('Dark mode:', darkMode);
      if (darkMode) setMode('dark');
    }, []),
  );

  return children;
};

const StackLayout = () => {
  return (
    <Stack
      initialRouteName='(sidebar)'
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
        name='onboard'
        options={{
          title: 'Onboard',
        }}
      />
      <Stack.Screen
        name='information/[foodId]'
        options={{
          title: 'Information',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
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
      retry: 0,
      retryOnMount: true,
      staleTime: Infinity,
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
    <FontsLoader onFontsLoaded={SplashScreen.hideAsync}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DarkThemeProvider>
            <NavigationThemeProvider>
              <AuthProvider>
                <StackLayout />
              </AuthProvider>
            </NavigationThemeProvider>
            <StyledToast />
          </DarkThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </FontsLoader>
  );
}
