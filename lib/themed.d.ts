import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    orange: string;
    background: string;
    redPink: string;
    green: string;
    blackGrey: string;
    grey: string;
    whiteGrey: string;
    white: string;
    black: string;
  }

  export interface ThemeSpacing {
    xxxs: number;
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  }
}
