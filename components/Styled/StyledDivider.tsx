import { StyleSheet } from 'react-native';
import { Divider, DividerProps, useTheme } from '@rneui/themed';

const StyledDivider = (props: DividerProps) => {
  const { theme } = useTheme();

  return (
    <Divider
      color={theme.colors.whiteGrey}
      width={StyleSheet.hairlineWidth}
      orientation='horizontal'
      {...props}
    />
  );
};

export default StyledDivider;
