import { useRouter } from 'expo-router';
import { Drawer as Sidebar } from 'expo-router/drawer';
import SidebarHeader from '@/components/SidebarHeader';

const SidebarLayout = () => {
  const router = useRouter();

  return (
    <Sidebar
      initialRouteName='(tabs)'
      screenOptions={{
        header: ({ navigation }) => {
          return (
            <SidebarHeader
              onMenuPress={() => navigation.openDrawer()}
              onAvatarPress={() => router.push('/(sidebar)/profile')}
            />
          );
        },
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
