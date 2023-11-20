import { Pressable, View } from 'react-native';
import { Header, makeStyles, useTheme } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useNavigation } from 'expo-router';
import { STYLES } from '@/lib/constants';
import { AvatarIcon, MenuIcon } from '@/components/Icon';
import StyledPressable from './StyledPressable';
import StyledText from './StyledText';
import { dismissKeyboard } from '@/lib/utils';
import useSidebar from '@/hooks/useSidebar';

type SidebarHeaderProps = {
  title: string | undefined;
};

const StyledHeader = ({ title }: SidebarHeaderProps) => {
  const router = useRouter();
  const sidebar = useSidebar();
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  // const onAvatarPress = () => router.push('/(sidebar)/profile');
  const onAvatarPress = () => router.push('/onboard');

  return (
    <Header
      onStartShouldSetResponder={dismissKeyboard}
      statusBarProps={{
        animated: true,
        // hidden: true,
      }}
      backgroundColor={theme.colors.background}
      barStyle={dT ? 'light-content' : 'dark-content'}
      containerStyle={{
        // paddingHorizontal: STYLES.PADDING.PADDING_16,
        // paddingTop: STYLES.PADDING.PADDING_16,
        // paddingBottom: STYLES.PADDING.PADDING_8,
        padding: STYLES.PADDING.PADDING_16,
        borderBottomWidth: 0,
        borderBottomColor: dT ? theme.colors.blackGrey : theme.colors.whiteGrey,
        // backgroundColor: 'red',
      }}
      leftComponent={
        <StyledPressable
          onPress={() => {
            dismissKeyboard();
            sidebar.open();
          }}
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
        <StyledPressable
          onPress={() => {
            dismissKeyboard();
            onAvatarPress();
          }}
          style={{ padding: 0 }}>
          <AvatarIcon />
        </StyledPressable>
      }
    />
  );
};

const useStyles = makeStyles(theme => ({}));

export default StyledHeader;
