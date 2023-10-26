import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Magra_400Regular, Magra_700Bold } from '@expo-google-fonts/magra';
import { ThemeProvider } from '@rneui/themed';
import theme from '@/lib/theme';
import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const FontsLoader = ({ children }: { children: React.ReactNode }) => {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    Magra_400Regular,
    Magra_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return children;
};

export default function RootLayout() {
  return (
    <FontsLoader>
      <ThemeProvider theme={theme}>
        <Stack initialRouteName='(sidebar)'>
          <Stack.Screen
            name='(sidebar)'
            options={
              {
                // headerShown: false,
              }
            }
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
      </ThemeProvider>
    </FontsLoader>
  );
}
