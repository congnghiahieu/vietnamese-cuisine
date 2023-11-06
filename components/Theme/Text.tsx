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
import { ExtendedColors, STYLES } from '@/lib/constants';

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
export type TextColor = keyof Pick<
  ExtendedColors,
  'blackGrey' | 'grey' | 'whiteGrey' | 'white' | 'orange'
>;
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

export type TextTypeStyleMapping = Record<TextType, TextTypeStyle>;

export const TEXT_STYLE_TYPE_MAP: TextTypeStyleMapping = {
  Heading_2: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_40,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_11(STYLES.FONT_SIZE.FONT_SIZE_40),
  },
  Heading_3: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_24,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_24),
  },
  Heading_4: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_18,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_18),
  },
  Heading_5: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_16),
  },
  Placeholder: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_14),
  },
  Body: {
    fontFamily: 'Magra_400Regular',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16(STYLES.FONT_SIZE.FONT_SIZE_16),
  },
  SubInputField: {
    fontFamily: 'Inter_400Regular',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_14),
  },
  Comment: {
    fontFamily: 'Magra_400Regular',
    fontSize: STYLES.FONT_SIZE.FONT_SIZE_12,
    lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_12),
  },
};

export const getDefaultTextStyleType = (
  props: Partial<Pick<ExtendedTextProps, 'ff' | 'fs'>>,
): TextTypeStyle => ({
  fontFamily: props.ff || 'Inter_500Medium',
  fontSize: props.fs || 16,
  lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16(props.fs || 16),
});

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
