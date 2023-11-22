import { useEffect, useState } from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';

export const useSound = (source: AVPlaybackSource) => {
  const [sound, setSound] = useState<Audio.Sound>();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  return { playSound };
};

export const useAppearSoundEffect = (source: AVPlaybackSource) => {
  const { playSound } = useSound(source);
  useEffect(() => {
    playSound();
  }, []);
};
