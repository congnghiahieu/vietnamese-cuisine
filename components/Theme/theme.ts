import { createTheme } from '@rneui/themed';
import { TextTypeStyle } from './Text';
import { STYLES, LIGHT_COLORS, DARK_COLORS } from '@/lib/constants';

export const theme = createTheme({
  lightColors: LIGHT_COLORS,
  darkColors: DARK_COLORS,
  mode: 'light',
  components: {
    Text: (props, theme) => {
      const color = theme.colors[props.color || 'grey'];
      let textTypeStyle: TextTypeStyle;
      switch (props.type) {
        case 'Heading_2':
          textTypeStyle = {
            fontFamily: 'Montserrat_700Bold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_40,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_11(STYLES.FONT_SIZE.FONT_SIZE_40),
          };
          break;
        case 'Heading_3':
          textTypeStyle = {
            fontFamily: 'Montserrat_700Bold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_24,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_24),
          };
          break;
        case 'Heading_4':
          textTypeStyle = {
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_18,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_18),
          };
          break;
        case 'Heading_5':
          textTypeStyle = {
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_16),
          };
          break;
        case 'Placeholder':
          textTypeStyle = {
            fontFamily: 'Montserrat_500Medium',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_14),
          };
          break;
        case 'Body':
          textTypeStyle = {
            fontFamily: 'Magra_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16(STYLES.FONT_SIZE.FONT_SIZE_16),
          };
          break;
        case 'SubInputField':
          textTypeStyle = {
            fontFamily: 'Inter_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_14,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_14),
          };
          break;
        case 'Comment':
          textTypeStyle = {
            fontFamily: 'Magra_400Regular',
            fontSize: STYLES.FONT_SIZE.FONT_SIZE_12,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_12),
          };
          break;
        default:
          textTypeStyle = {
            fontFamily: props.ff || 'Inter_500Medium',
            fontSize: props.fs || 16,
            lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_16(props.fs || 16),
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
