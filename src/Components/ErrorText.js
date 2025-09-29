import React from "react";
import { Text } from "react-native";
export default function ErrorText({ message }) {
  if (!message) return null;
  return <Text style={{ color: "#ffdddd", marginTop: 8 }}>{message}</Text>;
}
