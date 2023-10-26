import { Drawer as Sidebar } from 'expo-router/drawer';

const SidebarLayout = () => {
  return (
    <Sidebar initialRouteName='(tabs)'>
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
