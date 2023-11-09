import { Drawer as Sidebar } from 'expo-router/drawer';
import SidebarHeader from '@/components/SidebarHeader';
import { useTheme } from '@rneui/themed';

const SidebarLayout = () => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  return (
    <Sidebar
      initialRouteName='(home)'
      screenOptions={{
        swipeEnabled: true,
        header: ({ options }) => <SidebarHeader title={options.title} />,
        // drawerStyle: {
        //   backgroundColor: dT ? theme.colors.black : theme.colors.white,
        // },
        // drawerItemStyle: {},
        // drawerLabelStyle: {
        //   color: theme.colors.orange,
        // },
      }}>
      <Sidebar.Screen
        name='community'
        options={{
          headerShown: false,
          title: 'Community',
        }}
      />
      <Sidebar.Screen
        name='games'
        options={{
          headerShown: false,
          title: 'Games',
        }}
      />
      <Sidebar.Screen
        name='about'
        options={{
          title: 'About Us',
        }}
      />
      <Sidebar.Screen
        name='favourites'
        options={{
          title: 'Favourites',
        }}
      />
      <Sidebar.Screen
        name='(home)'
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Sidebar.Screen
        name='profile'
        options={{
          title: 'My Profile',
        }}
      />
      <Sidebar.Screen
        name='settings'
        options={{
          title: 'Settings',
        }}
      />
      <Sidebar.Screen
        name='support'
        options={{
          title: 'Support Us',
        }}
      />
    </Sidebar>
  );
};

export default SidebarLayout;
