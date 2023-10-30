import { Text, TextProps } from '@rneui/themed';

const StyledText = (props: TextProps) => {
  const { children, ...otherProps } = props;
  return <Text {...otherProps}>{children}</Text>;
};

export default StyledText;
