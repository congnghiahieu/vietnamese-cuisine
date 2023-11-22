import { View } from 'react-native';
import { Drawer as Sidebar } from 'expo-router/drawer';
import { makeStyles, useTheme } from '@rneui/themed';
import StyledHeader from '@/components/Styled/StyledHeader';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TEXT_STYLE_TYPE_MAP } from '@/components/Theme/Text';
import { STYLES } from '@/lib/constants';
import {
  DrawerItemList,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import StyledImage from '@/components/Styled/StyledImage';
import { AvatarIcon } from '@/components/Icon';
import StyledText from '@/components/Styled/StyledText';
import { OutlineButton } from '@/components/Styled/StyledButton';
import { useRouter } from 'expo-router';

const SidebarLayout = () => {
  const sidebarOptions = useSidebarOptions();

  return (
    <Sidebar
      initialRouteName='(home)'
      screenOptions={sidebarOptions}
      drawerContent={SidebarContent}>
      <Sidebar.Screen
        name='index'
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons name='home' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
      <Sidebar.Screen
        name='(protected)/community'
        options={{
          headerShown: false,
          title: 'Community',
          drawerIcon: ({ color }) => (
            <Ionicons name='people' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
      <Sidebar.Screen
        name='games'
        options={{
          headerShown: false,
          title: 'Games',
          drawerIcon: ({ color }) => (
            <Ionicons name='game-controller' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
      <Sidebar.Screen
        name='(protected)/favourites'
        options={{
          title: 'Favourites',
          drawerIcon: ({ color }) => (
            <AntDesign name='heart' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
      <Sidebar.Screen
        name='(protected)/profile'
        options={{
          title: 'My Profile',
          drawerIcon: ({ color }) => (
            <AntDesign name='user' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
      <Sidebar.Screen
        name='about'
        options={{
          title: 'About Us',
          drawerIcon: ({ color }) => (
            <AntDesign
              name='exclamationcircleo'
              size={STYLES.ICON_SIZE.ICON_SIZE_24}
              color={color}
            />
          ),
        }}
      />
      <Sidebar.Screen
        name='support'
        options={{
          title: 'Support Us',
          drawerIcon: ({ color }) => (
            <FontAwesome5
              name='hand-holding-heart'
              size={STYLES.ICON_SIZE.ICON_SIZE_24}
              color={color}
            />
          ),
        }}
      />
      <Sidebar.Screen
        name='settings'
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => (
            <Ionicons name='settings' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
          ),
        }}
      />
    </Sidebar>
  );
};

const useSidebarOptions = (): DrawerNavigationOptions => {
  const styles = useStyles();

  return {
    swipeEnabled: true,
    header: ({ options }) => <StyledHeader title={options.title} />,
    drawerItemStyle: {
      // backgroundColor: 'blue',
    },
    drawerContentContainerStyle: {
      // backgroundColor: 'green',
    },
    drawerContentStyle: styles.drawerContentStyle,
    drawerStyle: {},
    drawerActiveTintColor: styles.drawerActiveTintColor.color,
    drawerActiveBackgroundColor: styles.drawerActiveBackgroundColor.color,
    drawerInactiveTintColor: styles.drawerInactiveTintColor.color,
    drawerLabelStyle: styles.drawerLabelStyle,
    drawerType: 'front',
    overlayColor: styles.overlayColor.color,
  };
};

const SidebarContent = ({ descriptors, state, ...rest }: DrawerContentComponentProps) => {
  // This drawerContent Code copy from DrawerContent and DrawerContentScorllView (import above)
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const { drawerContentStyle, drawerContentContainerStyle } = focusedOptions;
  const styles = useStyles();
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...rest}
      contentContainerStyle={drawerContentContainerStyle}
      style={drawerContentStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={{ alignItems: 'center' }}>
        <StyledImage
          source={require('../../assets/images/adaptive-icon.png')}
          style={styles.icon}
        />
      </View>
      <StyledText type='Heading_3' color='orange' style={styles.title}>
        Vietnamese Cuisine
      </StyledText>
      <View style={styles.user}>
        <AvatarIcon />
        <View style={styles.info}>
          <StyledText type='Heading_5' color='white'>
            Welcome, User
          </StyledText>
          <View style={styles.navigate}>
            <OutlineButton
              title='Sign In'
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={() => router.push('/login')}
            />
            <OutlineButton
              title='Sign Up'
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={() => router.push('/register')}
            />
          </View>
        </View>
      </View>
      <DrawerItemList descriptors={descriptors} state={state} {...rest} />
    </DrawerContentScrollView>
  );
};

const useStyles = makeStyles(theme => {
  const dT = theme.mode === 'dark';

  return {
    drawerContentStyle: {
      backgroundColor: dT ? theme.colors.black : theme.colors.white,
    },
    drawerActiveBackgroundColor: {
      color: dT ? `${theme.colors.orange}55` : `${theme.colors.orange}33`,
    },
    drawerActiveTintColor: {
      color: theme.colors.orange,
    },
    drawerInactiveTintColor: {
      color: theme.colors.blackGrey,
    },
    drawerLabelStyle: {
      ...TEXT_STYLE_TYPE_MAP.Heading_5,
    },
    overlayColor: {
      color: `${theme.colors.black}99`,
    },
    icon: {
      width: 150,
      height: 150,
    },
    title: {
      paddingVertical: STYLES.PADDING.PADDING_8,
      textAlign: 'center',
    },
    user: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.orange,
      paddingHorizontal: STYLES.PADDING.PADDING_8 + STYLES.PADDING.PADDING_4,
      paddingVertical: STYLES.PADDING.PADDING_8,
    },
    info: {
      marginLeft: STYLES.MARGIN.MARGIN_16,
      gap: STYLES.GAP.GAP_4,
    },
    navigate: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: STYLES.GAP.GAP_8,
    },
    button: {
      color: theme.colors.white,
      borderColor: theme.colors.white,
      paddingVertical: STYLES.PADDING.PADDING_4,
      paddingHorizontal: STYLES.PADDING.PADDING_16,
    },
    buttonTitle: {
      marginHorizontal: 0,
      color: theme.colors.white,
      fontFamily: 'Montserrat_600SemiBold',
      fontSize: STYLES.FONT_SIZE.FONT_SIZE_12,
      lineHeight: STYLES.LINE_HEIGHT.LINE_HEIGHT_14(STYLES.FONT_SIZE.FONT_SIZE_12),
    },
  };
});

export default SidebarLayout;
