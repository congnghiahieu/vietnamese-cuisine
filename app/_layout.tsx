import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '@rneui/themed';
import {
  Theme as NavigationTheme,
  ThemeProvider as DefaultNavigationThemeProvider,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '@/components/Theme/theme';
import { FontsLoader } from '@/components/Theme/Text';

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
        <NavigationThemeProvider>
          <SafeAreaProvider>
            <StackLayout />
          </SafeAreaProvider>
        </NavigationThemeProvider>
      </ThemeProvider>
    </FontsLoader>
  );
}
