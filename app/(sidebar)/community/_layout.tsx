import SidebarHeader from '@/components/SidebarHeader';
import { Stack } from 'expo-router';

const CommunityLayout = () => {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        header: ({ options }) => <SidebarHeader title={options.title} />,
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Community',
          animation: 'default',
        }}
      />
      <Stack.Screen
        name='post'
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name='comment'
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
};

export default CommunityLayout;
