import { Divider, DividerProps, useTheme } from '@rneui/themed';

const StyledDivider = (props: DividerProps) => {
  const { theme } = useTheme();

  return (
    <Divider
      color={theme.colors.whiteGrey}
      style={{ height: 1, width: '100%' }}
      orientation='horizontal'
      {...props}
    />
  );
};

export default StyledDivider;
