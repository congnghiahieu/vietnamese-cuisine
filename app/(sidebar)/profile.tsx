import { StyleSheet, Text, Button, View } from 'react-native';
import { Link } from 'expo-router';

const Profile = () => {
  return (
    <View>
      <Link href='/login' asChild>
        <Button title='To login' />
      </Link>
      <Link href='/register' asChild>
        <Button title='To register' />
      </Link>
      <Link href='/onboard' asChild>
        <Button title='To onboard' />
      </Link>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
