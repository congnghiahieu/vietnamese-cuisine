import React, { useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme, useThemeMode } from '@rneui/themed';
import {
  Theme as NavigationTheme,
  ThemeProvider as DefaultNavigationThemeProvider,
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

const NavigationThemeProvider = ({ children }: { children: React.ReactNode }) => {
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

const StackLayout = () => {
  return (
    <Stack
      initialRouteName='(sidebar)'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='(sidebar)' />
      <Stack.Screen
        name='information'
        options={{
          title: 'Information',
        }}
      />
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

const DarkThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const firstMount = useRef(false);
  const { darkMode } = useSettingStates();
  const { setMode } = useThemeMode();

  useEffect(() => {
    console.log('First mount');
    if (firstMount.current) {
      console.log(darkMode);
      console.log('Second mount');
      setMode(darkMode ? 'dark' : 'light');
    } else {
      firstMount.current = true;
    }

    return;
  }, [firstMount.current]);

  return children;
};

export default function RootLayout() {
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

  return (
    <FontsLoader onFontsLoaded={SplashScreen.hideAsync}>
      <ThemeProvider theme={theme}>
        <DarkThemeProvider>
          <NavigationThemeProvider>
            <StackLayout />
          </NavigationThemeProvider>
        </DarkThemeProvider>
      </ThemeProvider>
    </FontsLoader>
  );
}
