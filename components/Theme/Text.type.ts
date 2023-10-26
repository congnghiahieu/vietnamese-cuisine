import { TextStyle as DefaultTextStyle } from 'react-native';

export type ExtendedColors = {
  orange: string;
  background: string;
  redPink: string;
  green: string;
  blackGrey: string;
  grey: string;
  whiteGrey: string;
  white: string;
  black: string;
};

export type TextFontFamily =
  | 'Montserrat_400Regular'
  | 'Montserrat_500Medium'
  | 'Montserrat_600SemiBold'
  | 'Montserrat_700Bold'
  | 'Montserrat_800ExtraBold'
  | 'Montserrat_900Black'
  | 'Inter_400Regular'
  | 'Inter_500Medium'
  | 'Inter_600SemiBold'
  | 'Inter_700Bold'
  | 'Inter_800ExtraBold'
  | 'Inter_900Black'
  | 'Magra_400Regular'
  | 'Magra_700Bold';

export type TextFontSize = number;

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
  fontFamily?: TextFontFamily;
  fontWeight?: DefaultTextStyle['fontWeight'];
  fontSize: TextFontSize;
  lineHeight: number;
};

export type ExtendedTextProps = {
  color: TextColor;
  ff: TextFontFamily;
  fs: TextFontSize;
  type: TextType;
};
