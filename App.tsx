import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ExploreScreen from './src/components/ExploreScreen';

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <ExploreScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
