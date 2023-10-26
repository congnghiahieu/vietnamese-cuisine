import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='favourites' options={{ title: 'Favourites' }} />
      <Tabs.Screen name='settings' options={{ title: 'Settings' }} />
      <Tabs.Screen name='games' options={{ title: 'Games' }} />
      <Tabs.Screen name='social' options={{ title: 'Social' }} />
    </Tabs>
  );
};

export default TabsLayout;
