import { createTheme } from '@rneui/themed';
import { TextTypeStyle, TEXT_STYLE_TYPE_MAP, getDefaultTextStyleType } from './Text';
import { LIGHT_COLORS, DARK_COLORS } from '@/lib/constants';

export const theme = createTheme({
  lightColors: LIGHT_COLORS,
  darkColors: DARK_COLORS,
  mode: 'light',
  components: {
    Text: (props, theme) => {
      const color = theme.colors[props.color || 'grey'];
      let textTypeStyle: TextTypeStyle;
      if (props.type) {
        textTypeStyle = TEXT_STYLE_TYPE_MAP[props.type];
      } else {
        textTypeStyle = getDefaultTextStyleType({
          ff: props.ff,
          fs: props.fs,
        });
      }

      return {
        children: props.children,
        style: [
          {
            ...textTypeStyle,
            color,
          },
          props.style,
        ],
      };
    },
  },
});
