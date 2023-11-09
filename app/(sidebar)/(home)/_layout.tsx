import SidebarHeader from '@/components/SidebarHeader';
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        header: ({ options }) => <SidebarHeader title={options.title} />,
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Home',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name='information'
        options={{
          headerShown: false,
          title: 'Information',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
