import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '@/lib/i18n';

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

export const settingStates = create<State & Actions>()(
  persist(
    (set, get) => ({
      darkMode: false,
      setDarkMode: active =>
        set({
          darkMode: active,
        }),
      language: 'en',
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
