import { Header, useTheme } from '@rneui/themed';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { STYLES } from '@/lib/constants';

type SidebarHeaderProps = {
  onMenuPress: () => void;
  onAvatarPress: () => void;
};

const SidebarHeader = ({ onMenuPress, onAvatarPress }: SidebarHeaderProps) => {
  const { theme } = useTheme();

  return (
    <Header
      backgroundColor={theme.colors.background}
      barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      leftComponent={
        <Ionicons
          name='menu'
          size={STYLES.ICON_SIZE.ICON_SIZE_24}
          color={theme.colors.orange}
          onPress={onMenuPress}
        />
      }
      rightComponent={
        <Pressable onPress={onAvatarPress}>
          <DefaultAvatar color={theme.colors.orange} />
        </Pressable>
      }
      style={{
        backgroundColor: '#fff',
      }}
    />
  );
};

const DefaultAvatar = ({ color }: { color: string }) => {
  return (
    <View style={[styles.avatarContainer, { borderColor: color }]}>
      <AntDesign name='user' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 4,
  },
});

export default SidebarHeader;
