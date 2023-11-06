import { Pressable, View } from 'react-native';
import { Header, makeStyles, useTheme } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { STYLES } from '@/lib/constants';
import { MenuIcon } from '@/components/Icon';
import StyledPressable from './Styled/StyledPressable';

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
        <StyledPressable
          onPress={onMenuPress}
          style={{
            paddingVertical: STYLES.PADDING.PADDING_8,
            paddingLeft: 0,
            paddingRight: STYLES.PADDING.PADDING_16,
          }}>
          <MenuIcon />
        </StyledPressable>
      }
      rightComponent={
        <StyledPressable onPress={onAvatarPress} style={{ padding: 0 }}>
          <DefaultAvatar color={theme.colors.orange} />
        </StyledPressable>
      }
    />
  );
};

const DefaultAvatar = ({ color }: { color: string }) => {
  const styles = useStyles();

  return (
    <View style={[styles.avatarContainer, { borderColor: color }]}>
      <AntDesign name='user' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 4,
  },
}));

export default SidebarHeader;
