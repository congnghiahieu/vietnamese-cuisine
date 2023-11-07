import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { STYLES } from '@/lib/constants';

type StyledPressableProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

const StyledPressable = ({ children, style, ...otherProps }: StyledPressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          padding: STYLES.PADDING.PADDING_4,
          opacity: pressed ? 0.7 : 1,
          // backgroundColor: 'red',
        },
        style,
      ]}
      {...otherProps}>
      {children}
    </Pressable>
  );
};

export default StyledPressable;
