import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import StyledDivider from '@/components/Styled/StyledDivider';
import { GameHeaderRight } from '@/components/Styled/StyledHeader';

const GuessFood = () => {
  const [soundOn, setSoundOn] = useState(true);
  const reset = () => {};

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <GameHeaderRight
              soundOn={soundOn}
              onSoundPress={() => setSoundOn(prev => !prev)}
              onResetPress={reset}
            />
          ),
        }}
      />
      <StyledDivider orientation='horizontal' />
      <View>
        <Text>MatchFood</Text>
      </View>
    </>
  );
};

export default GuessFood;

const styles = StyleSheet.create({});
