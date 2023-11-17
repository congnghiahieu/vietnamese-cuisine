import React, { useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import {
  Theme as NavigationTheme,
  ThemeProvider as DefaultNavigationThemeProvider,
  useIsFocused,
} from '@react-navigation/native';
import { theme } from '@/components/Theme/theme';
import { FontsLoader } from '@/components/Theme/Text';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/config/firebase';
import { useAuthStates } from '@/states/auth';
import { useSettingStates } from '@/states/setting';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type ProviderProps = {
  children: React.ReactNode;
};

const NavigationThemeProvider = ({ children }: ProviderProps) => {
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

const DarkThemeProvider = ({ children }: ProviderProps) => {
  const firstMount = useRef(false);
  const { darkMode } = useSettingStates();
  const { setMode } = useThemeMode();
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log(darkMode);
    setMode(darkMode ? 'dark' : 'light');
    if (firstMount.current) {
      console.log('Second mount');
    } else {
      firstMount.current = true;
      console.log('First mount');
    }

    return;
  }, [firstMount.current]);

  // useEffect(() => {
  //   console.log('Dark Theme use effect called');
  //   if (isFocused) {
  //     console.log('Dark mode: ', darkMode);
  //     setMode(darkMode ? 'dark' : 'light');
  //   }
  // }, [isFocused]);

  return children;
};

const AuthProvider = ({ children }: ProviderProps) => {
  const { setUser } = useAuthStates();
  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribeFromAuthStatusChanged;
  }, []);

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
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <FontsLoader onFontsLoaded={SplashScreen.hideAsync}>
      <ThemeProvider theme={theme}>
        <DarkThemeProvider>
          <NavigationThemeProvider>
            <AuthProvider>
              <StackLayout />
            </AuthProvider>
          </NavigationThemeProvider>
        </DarkThemeProvider>
      </ThemeProvider>
    </FontsLoader>
  );
}
