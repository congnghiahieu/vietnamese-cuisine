import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@rneui/themed';
import { STYLES } from '@/lib/constants';

const TabsLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name='games'
        options={{
          title: 'Games',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='game-controller' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ) : (
              <Ionicons
                name='game-controller-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={color}
              />
            ),
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          title: 'Favourites',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='heart' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ) : (
              <Ionicons name='heart-outline' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='home' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ) : (
              <Ionicons name='home-outline' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name='social'
        options={{
          title: 'Social',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='people' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ) : (
              <Ionicons name='people-outline' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name='settings' size={STYLES.ICON_SIZE.ICON_SIZE_24} color={color} />
            ) : (
              <Ionicons
                name='settings-outline'
                size={STYLES.ICON_SIZE.ICON_SIZE_24}
                color={color}
              />
            ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
