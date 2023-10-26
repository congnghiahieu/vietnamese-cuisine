import { createTheme } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    orange: '#FB8A22',
    background: '#FFF8F1',
    redPink: '#E73253',
    green: '#85BC39',
    blackGrey: '#454545',
    grey: '#484646b3',
    whiteGrey: '#DEDEDE',
    white: '#FFFFFF',
    black: '#000000',
  },
  darkColors: {
    orange: '#D97706',
    background: '#1D232A',
    redPink: '#E73253',
    green: '#36D399',
    blackGrey: '#676D78',
    grey: '#A6ADBA',
    whiteGrey: '#DEDEDE',
    white: '#FFFFFF',
    black: '#000000',
  },
  mode: 'light',
  spacing: {
    xxxs: 4,
    xxs: 8,
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36,
  },
});

export default theme;
