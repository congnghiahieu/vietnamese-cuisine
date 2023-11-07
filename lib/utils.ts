import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const wp = (percent: number) => (percent / 100) * width;
export const hp = (percent: number) => (percent / 100) * height;
