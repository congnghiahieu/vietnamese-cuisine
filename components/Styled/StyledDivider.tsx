import { Divider, DividerProps, useTheme } from '@rneui/themed';

const StyledDivider = (props: DividerProps) => {
  const { theme } = useTheme();

  return <Divider color={theme.colors.whiteGrey} width={1} orientation='horizontal' {...props} />;
};

export default StyledDivider;
