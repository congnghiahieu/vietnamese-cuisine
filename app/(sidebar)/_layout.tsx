import { Drawer as Sidebar } from 'expo-router/drawer';
import SidebarHeader from '@/components/SidebarHeader';
import { useTheme } from '@rneui/themed';

const SidebarLayout = () => {
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';

  return (
    <Sidebar
      initialRouteName='(tabs)'
      screenOptions={{
        header: () => <SidebarHeader />,
        drawerStyle: {
          backgroundColor: dT ? theme.colors.black : theme.colors.white,
        },
        drawerItemStyle: {},
        drawerLabelStyle: {
          color: theme.colors.orange,
        },
        swipeEnabled: true,
      }}>
      <Sidebar.Screen
        name='(tabs)'
        options={{
          title: 'Home',
        }}
      />
      <Sidebar.Screen
        name='about'
        options={{
          title: 'About Us',
        }}
      />
      <Sidebar.Screen
        name='support'
        options={{
          title: 'Support Us',
        }}
      />
      <Sidebar.Screen
        name='profile'
        options={{
          title: 'My Profile',
        }}
      />
    </Sidebar>
  );
};

export default SidebarLayout;
