import { Switch, useTheme } from '@rneui/themed';

type StyledSwitchProps = {
  onToggle: (isEnabled: boolean) => void;
  isEnabled: boolean;
};

const StyledSwitch = ({ isEnabled, onToggle }: StyledSwitchProps) => {
  const { theme } = useTheme();

  return (
    <Switch
      trackColor={{
        true: theme.colors.white,
        false: theme.colors.white,
      }}
      thumbColor={isEnabled ? theme.colors.orange : theme.colors.blackGrey}
      onValueChange={onToggle}
      value={isEnabled}
    />
  );
};

export default StyledSwitch;
