// src/Components/ThemeToggle.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeOS } from "../Theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle, mode } = useThemeOS();
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          // canto inferior direito, afastado da safe area
          bottom: (insets?.bottom || 0) + 16,
          right: 16,
        },
      ]}
    >
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Alternar tema claro/escuro"
        onPress={toggle}
        style={[
          styles.btn,
          {
            backgroundColor: theme.cardBg,
            shadowColor: "#000",
          },
        ]}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Text style={[styles.label, { color: theme.cardTitle }]}>
          {mode === "light" ? "🌙" : "🌞"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    zIndex: 999,
    // o container não intercepta toques fora do botão
    // (para não atrapalhar cliques nos elementos da tela)
    backgroundColor: "transparent",
  },
  btn: {
    minWidth: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    // sombra leve (Android/iOS)
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
});
