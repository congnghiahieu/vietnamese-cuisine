import { Dimensions, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

export const wp = (percent: number) => (percent / 100) * width;
export const hp = (percent: number) => (percent / 100) * height;

export const dismissKeyboard = () => {
  Keyboard.dismiss();
  return false;
};

export const getCurrentTimeISO = () => new Date().toISOString();

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

export const convertViToEn = (str: string, toUpperCase = false) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str;
};

export const removeAccents = (str: string) =>
  !str.trim()
    ? ''
    : str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');

export const normalizeStr = (str: string) => removeAccents(str.toLowerCase());
