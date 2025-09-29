import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingOverlay({ visible }) {
  if (!visible) return null;
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
  }
});
