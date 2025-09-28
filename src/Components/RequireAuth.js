import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Context/AuthContext";

/**
 * Componente que bloqueia o conteúdo se não houver usuário logado.
 * - Se estiver logado, renderiza `children`.
 * - Se NÃO estiver logado, mostra uma tela inteira pedindo login/cadastro.
 *
 * Props:
 * - redirectTo: string ("RegisteredMotorcycles" | "RegisterMotorcycle" | etc.)
 * - children: conteúdo da tela protegida
 */
export default function RequireAuth({ redirectTo, children }) {
  const navigation = useNavigation();
  const { user } = useAuth?.() || { user: null };

  if (user) return children;

  return (
    <View style={styles.block}>
      <Text style={styles.title}>Acesso restrito</Text>
      <Text style={styles.text}>
        Para continuar, faça login na sua conta. Se ainda não tem cadastro, crie agora mesmo.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.btnPrimary]}
        onPress={() => navigation.navigate("SignIn", { redirectTo })}
      >
        <Text style={styles.btnPrimaryText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.btnGhost]}
        onPress={() => navigation.navigate("Register", { redirectTo })}
      >
        <Text style={styles.btnGhostText}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.linkText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: "#268B7D",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 24,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  text: {
    color: "#fff",
    opacity: 0.9,
    marginBottom: 16
  },
  button: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginTop: 10
  },
  btnPrimary: { backgroundColor: "#1E5F55" },
  btnPrimaryText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  btnGhost: { backgroundColor: "#fff" },
  btnGhostText: { color: "#268B7D", fontWeight: "bold", fontSize: 16 },
  link: { alignItems: "center", marginTop: 12 },
  linkText: { color: "#fff", textDecorationLine: "underline", fontSize: 16 },
});
