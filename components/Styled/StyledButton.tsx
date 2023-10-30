import { Button, ButtonProps } from '@rneui/themed';

const StyledButton = (props: ButtonProps) => {
  const { children, ...otherProps } = props;
  return <Button {...otherProps}>{children}</Button>;
};

export default StyledButton;
