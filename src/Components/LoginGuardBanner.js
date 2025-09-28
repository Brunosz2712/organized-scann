import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginGuardBanner({ visible, message, onLogin, onDismiss }) {
  if (!visible) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerTitle}>Acesso restrito</Text>
      <Text style={styles.bannerText}>{message}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.btnPrimary]} onPress={onLogin}>
          <Text style={styles.btnPrimaryText}>Entrar agora</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnGhost]} onPress={onDismiss}>
          <Text style={styles.btnGhostText}>Continuar sem login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bannerTitle: {
    color: "#268B7D",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  bannerText: {
    color: "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: "#1E5F55",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnGhost: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1E5F55",
  },
  btnGhostText: {
    color: "#1E5F55",
    fontWeight: "bold",
  },
});
