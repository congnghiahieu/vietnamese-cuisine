import { StyleSheet, View, Text as DefaultText } from 'react-native';
import { useThemeMode, Text as StyledText } from '@rneui/themed';
import StyledSwitch from '@/components/Styled/StyledSwitch';

const Settings = () => {
  const { mode, setMode } = useThemeMode();

  return (
    <View style={styles.container}>
      <View>
        <StyledText type='Body' color='blackGrey'>
          Welcome
        </StyledText>
        <StyledText type='Body' color='grey'>
          Welcome
        </StyledText>
        <StyledText type='Body' color='whiteGrey'>
          Welcome
        </StyledText>
        <StyledText type='Body' color='white'>
          Welcome
        </StyledText>
      </View>
      <StyledSwitch
        isEnabled={mode === 'dark'}
        onToggle={isDarkModeEnabled => setMode(isDarkModeEnabled ? 'dark' : 'light')}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
