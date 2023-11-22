import { Platform, View } from 'react-native';
import { CloseIcon } from '@/components/Icon';
import StyledHeader from '@/components/Styled/StyledHeader';
import StyledPressable from '@/components/Styled/StyledPressable';
import StyledText from '@/components/Styled/StyledText';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@rneui/themed';

const CommunityLayout = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const dT = theme.mode === 'dark';
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        headerStyle: {
          backgroundColor: dT ? theme.colors.black : theme.colors.white,
        },
      }}>
      <Stack.Screen
        name='index'
        options={{
          header: ({ options }) => <StyledHeader title={options.title} />,
          title: 'Community',
          animation: 'default',
        }}
      />
      <Stack.Screen
        name='publish'
        options={{
          headerTitle: () => (
            <StyledText type='Heading_3' color='blackGrey'>
              Make a Post
            </StyledText>
          ),
          headerLeft: () => (
            <StyledPressable onPress={() => router.back()}>
              <CloseIcon />
            </StyledPressable>
          ),
          ...Platform.select({
            android: {
              animation: 'slide_from_bottom',
            },
            ios: {
              presentation: 'modal',
            },
          }),
        }}
      />
      <Stack.Screen
        name='comment'
        options={{
          headerTitle: () => (
            <StyledText type='Heading_3' color='blackGrey'>
              Comments
            </StyledText>
          ),
          headerLeft: () => (
            <StyledPressable onPress={() => router.back()}>
              <CloseIcon />
            </StyledPressable>
          ),
          ...Platform.select({
            android: {
              animation: 'slide_from_bottom',
            },
            ios: {
              presentation: 'modal',
            },
          }),
        }}
      />
    </Stack>
  );
};

export default CommunityLayout;
