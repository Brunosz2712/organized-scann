import React from "react";
import { Text } from "react-native";

export default function ErrorText({ message, style }) {
  if (!message) return null;
  return <Text style={[{ color: "#ffdddd" }, style]}>{message}</Text>;
}
