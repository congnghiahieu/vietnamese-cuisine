import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Redirect, Stack } from 'expo-router';
import { useTheme } from '@rneui/themed';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  if (showOnboarding) {
    console.log('Show Onboard Screen');
    return <Redirect href='/onboard' />;
  }

  return (
    <>
      <StatusBar barStyle={dT ? 'light-content' : 'dark-content'} />
      <Stack
        initialRouteName='(sidebar)'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='(sidebar)' />
        {/* <Stack.Screen
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
        /> */}
        <Stack.Screen name='auth' />
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

export default StackLayout;
