import { Pressable, StyleSheet, View } from 'react-native';
import { Header, useTheme } from '@rneui/themed';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { STYLES } from '@/lib/constants';

type SidebarHeaderProps = {
  onMenuPress: () => void;
  onAvatarPress: () => void;
};

const SidebarHeader = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  const onMenuPress = () => navigation.dispatch(DrawerActions.openDrawer());
  const onAvatarPress = () => router.push('/(sidebar)/profile');

  return (
    <Header
      backgroundColor={theme.colors.background}
      barStyle={dT ? 'light-content' : 'dark-content'}
      containerStyle={{
        paddingHorizontal: STYLES.PADDING.PADDING_16,
        paddingVertical: STYLES.PADDING.PADDING_8,
        borderBottomColor: dT ? theme.colors.blackGrey : theme.colors.whiteGrey,
      }}
      leftComponent={
        <Pressable onPress={onMenuPress} style={styles.iconMenu}>
          <Ionicons name='menu' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={theme.colors.orange} />
        </Pressable>
      }
      rightComponent={
        <Pressable onPress={onAvatarPress}>
          <DefaultAvatar color={theme.colors.orange} />
        </Pressable>
      }
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
  iconMenu: {
    paddingVertical: STYLES.PADDING.PADDING_4,
  },
});

export default SidebarHeader;
