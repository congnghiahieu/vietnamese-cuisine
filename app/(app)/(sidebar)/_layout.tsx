import { ActivityIndicator, StatusBar, View } from 'react-native';
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
import { Redirect, useRouter } from 'expo-router';
import { i18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import useI18nChangeEffect from '@/hooks/useI18nChangeEffect';
import { User } from '@/config/model';
import { useQuery } from '@tanstack/react-query';
import { FIREBASE_DB } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { LoadingView } from '@/components/Styled/StyledView';
import { StyledCircleLoading } from '@/components/Styled/StyledLoading';

const useProfileQuery = ({ email }: { email: string }) =>
  useQuery<User>({
    queryKey: ['profile', email],
    queryFn: async () => {
      if (!email) throw new Error();

      const docRef = doc(FIREBASE_DB, 'users', email);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) throw new Error(i18n.t('other.errorOccurr'));

      const user = userDoc.data() as User;
      return user;
    },
    retry: 0,
  });

const SidebarLayout = () => {
  const sidebarOptions = useSidebarOptions();
  const { theme } = useTheme();
  const [key, setKey] = useState(Math.random());
  useI18nChangeEffect(() => setKey(Math.random()));
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const checkAlreadyOnboarded = async () => {
    const onboarded = await AsyncStorage.getItem('Vietnamese Cuisine Onboard');
    console.log(onboarded);
    setShowOnboarding(onboarded === 'true' ? false : true);
    setIsLoading(false);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    checkAlreadyOnboarded();
  }, []);

  if (isLoading) {
    return null;
  }

  if (showOnboarding) {
    console.log('Show Onboard Screen');
    return <Redirect href='/onboard' />;
  }

  return (
    <>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <Sidebar
        key={key}
        initialRouteName='(home)'
        screenOptions={sidebarOptions}
        drawerContent={SidebarContent}>
        <Sidebar.Screen
          name='index'
          options={{
            title: i18n.t('sidebar.home'),
            drawerIcon: ({ color }) => (
              <Ionicons name='home' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
        <Sidebar.Screen
          name='(protected)/community'
          options={{
            headerShown: false,
            title: i18n.t('sidebar.community'),
            drawerIcon: ({ color }) => (
              <Ionicons name='people' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
        <Sidebar.Screen
          name='games'
          options={{
            headerShown: false,
            title: i18n.t('sidebar.games'),
            drawerIcon: ({ color }) => (
              <Ionicons name='game-controller' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
        <Sidebar.Screen
          name='(protected)/favourites'
          options={{
            title: i18n.t('sidebar.favourites'),
            drawerIcon: ({ color }) => (
              <AntDesign name='heart' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
        <Sidebar.Screen
          name='(protected)/profile'
          options={{
            title: i18n.t('sidebar.myProfile'),
            drawerIcon: ({ color }) => (
              <AntDesign name='user' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
        <Sidebar.Screen
          name='about'
          options={{
            title: i18n.t('sidebar.about'),
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
            title: i18n.t('sidebar.support'),
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
            title: i18n.t('sidebar.settings'),
            drawerIcon: ({ color }) => (
              <Ionicons name='settings' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
          }}
        />
      </Sidebar>
    </>
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

  return (
    <DrawerContentScrollView
      {...rest}
      contentContainerStyle={drawerContentContainerStyle}
      style={drawerContentStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={{ alignItems: 'center' }}>
        <StyledImage
          source={require('../../../assets/images/adaptive-icon.png')}
          style={styles.icon}
        />
      </View>
      <StyledText type='Heading_3' color='orange' style={styles.title}>
        {i18n.t('other.appName')}
      </StyledText>
      <SidebarUserContent />
      <DrawerItemList descriptors={descriptors} state={state} {...rest} />
    </DrawerContentScrollView>
  );
};

const SidebarUserContent = () => {
  const { user } = useAuth();
  const styles = useStyles();
  const router = useRouter();

  const {
    data: dbUser,
    isPending,
    error,
  } = useProfileQuery({
    email: user?.email || '',
  });

  let content: React.ReactNode;
  if (isPending) {
    content = (
      <ActivityIndicator
        animating
        color='white'
        size='small'
        style={{
          paddingVertical: STYLES.PADDING.PADDING_16,
        }}
      />
    );
  } else if (error) {
    content = (
      <>
        <StyledText type='Heading_5' color='white'>
          {i18n.t('sidebar.welcome')}, User
        </StyledText>
        <View style={styles.navigate}>
          <OutlineButton
            title={i18n.t('sidebar.signIn')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => router.push('/login')}
          />
          <OutlineButton
            title={i18n.t('sidebar.signUp')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => router.push('/register')}
          />
        </View>
      </>
    );
  } else {
    content = (
      <>
        <StyledText type='Heading_5' color='white'>
          {i18n.t('sidebar.welcome')}, {dbUser.fullname.split(' ').reverse()[0]}
        </StyledText>
        <View style={styles.navigate}>
          {/* <OutlineButton
            title={i18n.t('sidebar.signOut')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => router.push('/register')}
          /> */}
          <OutlineButton
            title={i18n.t('sidebar.profile')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => router.push('/(app)/(sidebar)/(protected)/profile')}
          />
        </View>
      </>
    );
  }

  return (
    <View style={styles.user}>
      <AvatarIcon />
      <View style={styles.info}>{content}</View>
    </View>
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
      flex: 1,
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
