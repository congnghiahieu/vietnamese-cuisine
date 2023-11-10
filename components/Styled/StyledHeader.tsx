import { Pressable, View } from 'react-native';
import { Header, makeStyles, useTheme } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { STYLES } from '@/lib/constants';
import { AvatarIcon, MenuIcon } from '@/components/Icon';
import StyledPressable from './StyledPressable';
import StyledText from './StyledText';

type SidebarHeaderProps = {
  title: string | undefined;
};

const StyledHeader = ({ title }: SidebarHeaderProps) => {
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
        borderBottomWidth: 0,
        borderBottomColor: dT ? theme.colors.blackGrey : theme.colors.whiteGrey,
      }}
      leftComponent={
        <StyledPressable
          onPress={onMenuPress}
          style={{
            paddingVertical: STYLES.PADDING.PADDING_8,
            paddingRight: STYLES.PADDING.PADDING_32,
            paddingLeft: 0,
          }}>
          <MenuIcon />
        </StyledPressable>
      }
      centerComponent={
        <StyledText type='Heading_2' color='orange'>
          {title || 'Home'}
        </StyledText>
      }
      rightComponent={
        <StyledPressable onPress={onAvatarPress} style={{ padding: 0 }}>
          <AvatarIcon />
        </StyledPressable>
      }
    />
  );
};

const useStyles = makeStyles(theme => ({}));

export default StyledHeader;
