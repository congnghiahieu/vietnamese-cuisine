import StyledHeader from '@/components/Styled/StyledHeader';
import { Stack } from 'expo-router';

const GamesLayout = () => {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        header: ({ options }) => <StyledHeader title={options.title} />,
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Games',
          animation: 'flip',
        }}
      />
      <Stack.Screen
        name='guess-food'
        options={{
          headerShown: false,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name='match-food'
        options={{
          headerShown: false,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name='pick-ingredients'
        options={{
          headerShown: false,
          animation: 'slide_from_left',
        }}
      />
    </Stack>
  );
};

export default GamesLayout;
