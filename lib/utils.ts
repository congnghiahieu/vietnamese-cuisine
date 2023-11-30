import { Dimensions, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

export const wp = (percent: number) => (percent / 100) * width;
export const hp = (percent: number) => (percent / 100) * height;

export const dismissKeyboard = () => {
  Keyboard.dismiss();
  return false;
};

export const getCurrentTimeString = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const SORT_TYPE_MAP = {
  'ASC': 1,
  'DESC': -1,
};

export type SortType = keyof typeof SORT_TYPE_MAP;

export const timeSorter = <T extends Record<string, any>>({
  arr,
  sortType = 'ASC',
  key,
}: {
  arr: T[];
  sortType?: SortType;
  key: keyof T;
}): T[] => {
  return arr.sort(
    (a, b) => SORT_TYPE_MAP[sortType] * (new Date(a[key]).getTime() - new Date(b[key]).getTime()),
  );
};

export const shuffleArray = <T>(array: T[]) => {
  const copied = Array.from(array);
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const randomIndex = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    const temp = copied[counter];
    copied[counter] = copied[randomIndex];
    copied[randomIndex] = temp;
  }
  return copied;
};
