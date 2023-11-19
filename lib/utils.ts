import { Dimensions, Keyboard } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const wp = (percent: number) => (percent / 100) * width;
export const hp = (percent: number) => (percent / 100) * height;

export const dismissKeyboard = () => {
  Keyboard.dismiss();
  return false;
};
