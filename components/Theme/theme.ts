import { createTheme } from '@rneui/themed';
import { TextTypeStyle } from './Text.type';
import { STYLES } from '@/lib/constants';

export const theme = createTheme({
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
  components: {
    Text: (props, theme) => {
      const color = theme.colors[props.color || 'grey'];
      let textTypeStyle: TextTypeStyle;
      switch (props.type) {
        case 'Heading_2':
          textTypeStyle = {
            fontFamily: 'Montserrat_700Bold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_40,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_11 * STYLES.FONT_SIZE.FONT_SIZE_40,
          };
          break;
        case 'Heading_3':
          textTypeStyle = {
            fontFamily: 'Montserrat_700Bold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_24,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_24,
          };
          break;
        case 'Heading_4':
          textTypeStyle = {
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_18,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_18,
          };
          break;
        case 'Heading_5':
          textTypeStyle = {
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_16,
          };
          break;
        case 'Placeholder':
          textTypeStyle = {
            fontFamily: 'Montserrat_500Medium',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_14,
          };
          break;
        case 'Body':
          textTypeStyle = {
            fontFamily: 'Magra_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16 * STYLES.FONT_SIZE.FONT_SIZE_16,
          };
          break;
        case 'SubInputField':
          textTypeStyle = {
            fontFamily: 'Inter_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_14,
          };
          break;
        case 'Comment':
          textTypeStyle = {
            fontFamily: 'Magra_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_12,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14 * STYLES.FONT_SIZE.FONT_SIZE_12,
          };
          break;
        default:
          textTypeStyle = {
            fontFamily: props.ff || 'Inter_500Medium',
            fontWeight: '500',
            fontSize: props.fs || 16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16 * (props.fs || 16),
          };
      }
      return {
        children: props.children,
        style: {
          ...textTypeStyle,
          color,
        },
      };
    },
  },
});
