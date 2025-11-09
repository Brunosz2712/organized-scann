import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function About() {
  const sha = Constants?.expoConfig?.extra?.COMMIT_SHA ?? 'dev-local';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text>Commit: {sha.substring(0, 8)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems:'center', justifyContent:'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 }
});
