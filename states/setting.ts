import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, SETTINGS_KEYS } from '@/lib/constants';

type State = {
  darkMode: boolean;
  language: Language;
  notifications: boolean;
};

type Actions = {
  setDarkMode: (active: boolean) => void;
  setLanguage: (lang: Language) => void;
  setNotifications: (active: boolean) => void;
};

// const getDarkMode = async () => {
//   const isDarkMode = await AsyncStorage.getItem(SETTINGS_KEYS.darkMode);
//   return Boolean(isDarkMode);
// };

// const getLanguage = async (): Promise<Language> => {
//   const lang = await AsyncStorage.getItem(SETTINGS_KEYS.language);
//   if (lang) {
//     return lang as Language;
//   } else {
//     return 'English';
//   }
// };
// const getNotifications = async () => {
//   const isNotifications = await AsyncStorage.getItem(SETTINGS_KEYS.darkMode);
//   return Boolean(isNotifications);
// };

// const initialDarkMode = await getDarkMode();
// const initialLanguage = await getLanguage();
// const initialNotifications = await getNotifications();

export const settingStates = create<State & Actions>()(
  persist(
    (set, get) => ({
      darkMode: false,
      setDarkMode: active =>
        set({
          darkMode: active,
        }),
      language: 'English',
      setLanguage: language =>
        set({
          language,
        }),
      notifications: true,
      setNotifications: active =>
        set({
          notifications: active,
        }),
    }),
    {
      name: 'Vietnamese Cuisine Settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useSettingStates = () => settingStates(state => state);

// set => ({
//   darkMode: initialDarkMode,
//   setDarkMode: async active =>
//     set(() => {
//       AsyncStorage.setItem(SETTINGS_KEYS.darkMode, String(active), error => {
//         if (error) {
//           console.log(error.message);
//         }
//       });
//       return {
//         darkMode: active,
//       };
//     }),
//   language: initialLanguage,
//   setLanguage: language =>
//     set(() => {
//       AsyncStorage.setItem(SETTINGS_KEYS.language, language).catch(err => {});
//       return {
//         language,
//       };
//     }),
//   notifications: initialNotifications,
//   setNotifications: active =>
//     set(() => {
//       AsyncStorage.setItem(SETTINGS_KEYS.notifications, String(active)).catch(err => {});
//       return {
//         notifications: active,
//       };
//     }),
// })