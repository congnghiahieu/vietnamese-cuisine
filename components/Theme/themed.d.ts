import '@rneui/themed';
import { ExtendedTextProps } from './Text';
import { ExtendedColors } from '@/lib/constants';

declare module '@rneui/themed' {
  export interface Colors extends ExtendedColors {}

  export interface ThemeSpacing {
    // xxxs: number;
    // xxs: number;
    // xs: number;
    // sm: number;
    // md: number;
    // lg: number;
    // xl: number;
    // xxl: number;
    // xxxl: number;
  }

  export interface TextProps extends Partial<ExtendedTextProps> {}

  export interface ComponentTheme {
    Text: Partial<TextProps>;
  }
}
