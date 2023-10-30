import React, { useEffect } from 'react';
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
import { ExtendedColors } from '@/lib/constants';

export const Fonts = {
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
};

export type TextFontFamily = keyof typeof Fonts;
export type TextColor = keyof Pick<ExtendedColors, 'blackGrey' | 'grey' | 'whiteGrey' | 'white'>;
export type TextType =
  | 'Heading_2'
  | 'Heading_3'
  | 'Heading_4'
  | 'Heading_5'
  | 'Placeholder'
  | 'Body'
  | 'SubInputField'
  | 'Comment';

export type TextTypeStyle = {
  fontFamily: TextFontFamily;
  fontSize: number;
  lineHeight: number;
};

export type ExtendedTextProps = {
  ff: TextFontFamily;
  fs: number;
  color: TextColor;
  type: TextType;
};

type FontsLoaderProps = {
  children: React.ReactNode;
  onFontsLoaded: () => void;
};

export const FontsLoader = (props: FontsLoaderProps) => {
  const { children, onFontsLoaded } = props;
  const [loaded, error] = useFonts(Fonts);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      onFontsLoaded();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return children;
};
