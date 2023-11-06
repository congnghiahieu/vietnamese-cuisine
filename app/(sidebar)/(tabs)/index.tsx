import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import StyledText from '@/components/Styled/StyledText';

const Home = () => {
  return (
    <View style={{ flex: 1, gap: 20 }}>
      <Text>Home</Text>
      <Link href='/register' asChild>
        <StyledText>To Register page</StyledText>
      </Link>
      <Link href='/login' asChild>
        <StyledText>To Login; page</StyledText>
      </Link>
      <Link href='/onboard' asChild>
        <StyledText>To Onboard page</StyledText>
      </Link>
      <Link href='/information' asChild>
        <StyledText>To Information page</StyledText>
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
