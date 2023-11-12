import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const OnBoard = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight || 0,
      }}>
      <View>
        <Text>OnBoard</Text>
      </View>
    </SafeAreaView>
  );
};

export default OnBoard;

const styles = StyleSheet.create({});
