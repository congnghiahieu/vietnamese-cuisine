import { Stack } from 'expo-router';
import { useTheme } from '@rneui/themed';
import StyledHeader from '@/components/Styled/StyledHeader';
import { i18n } from '@/lib/i18n';

const GamesLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Stack.Screen
        name='index'
        options={{
          title: i18n.t('games.games'),
          animation: 'flip',
          header: ({ options }) => <StyledHeader title={options.title} />,
        }}
      />
      <Stack.Screen
        name='guess-food'
        options={{
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name='match-food'
        options={{
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name='pick-ingredients'
        options={{
          animation: 'slide_from_left',
        }}
      />
    </Stack>
  );
};

export default GamesLayout;
