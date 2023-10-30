import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

const TabsLayout = () => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  const activeIconColor = theme.colors.orange;
  const inactiveIconColor = theme.colors.blackGrey;

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: dT ? theme.colors.black : theme.colors.white,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name='games'
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons
                name='game-controller'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={activeIconColor}
              />
            ) : (
              <Ionicons
                name='game-controller-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={inactiveIconColor}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='heart' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={activeIconColor} />
            ) : (
              <Ionicons
                name='heart-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={inactiveIconColor}
              />
            ),
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name='home' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={activeIconColor} />
            ) : (
              <Ionicons
                name='home-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={inactiveIconColor}
              />
            ),
        }}
      />
      <Tabs.Screen
        name='community'
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='people'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={activeIconColor}
              />
            ) : (
              <Ionicons
                name='people-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={inactiveIconColor}
              />
            ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name='settings'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={activeIconColor}
              />
            ) : (
              <Ionicons
                name='settings-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={inactiveIconColor}
              />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
