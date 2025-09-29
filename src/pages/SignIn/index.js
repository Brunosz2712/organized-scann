import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";
import { getUser, login as setSession } from "../Storage/auth";

export default function SignIn() {
  const navigation = useNavigation();
  const { theme } = useThemeOS();
  const styles = makeStyles(theme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const _email = email.trim().toLowerCase();
    const _password = password;

    if (!_email || !_password) {
      Alert.alert("Erro", "Preencha e-mail e senha.");
      return;
    }

    try {
      const user = await getUser();
      if (!user) {
        Alert.alert("Atenção", "Você ainda não tem cadastro.", [
          { text: "OK", onPress: () => navigation.navigate("Register") },
        ]);
        return;
      }

      const ok = user?.email?.toLowerCase() === _email && user?.password === _password;
      if (!ok) {
        Alert.alert("Erro", "Credenciais inválidas.");
        return;
      }

      await setSession({ fullName: user.fullName, email: user.email });
      Alert.alert("Bem-vindo", `Login realizado!`, [
        { text: "OK", onPress: () => navigation.replace("RegisteredMotorcycles") },
      ]);
    } catch {
      Alert.alert("Erro", "Falha ao efetuar login.");
    }
  }

  return (
    <View style={styles.container}>
      <ThemeToggle />
      <Animatable.View animation="fadeInLeft" delay={300} style={styles.containerHeader}>
        <Text style={styles.message}>Faça seu login</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.backButtonText}>Criar uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.backButtonText}>Voltar para o início</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const makeStyles = (t) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: t.bg },
    containerHeader: { marginTop: "25%", marginBottom: "8%", paddingStart: "5%" },
    message: { fontSize: 30, fontWeight: "bold", color: t.textOnBg },
    containerForm: {
      flex: 1,
      backgroundColor: t.surface,
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
      paddingStart: "5%",
      paddingEnd: "5%",
      paddingTop: 20,
    },
    title: { fontSize: 20, marginTop: 20, color: t.textOnSurface },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: t.textOnSurface + "33",
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      color: t.textOnSurface,
    },
    button: {
      backgroundColor: t.primary,
      width: "100%",
      borderRadius: 4,
      paddingVertical: 10,
      marginTop: 20,
      alignItems: "center",
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    backButton: { marginTop: 15, alignItems: "center" },
    backButtonText: { color: t.textOnSurface, fontSize: 16, textDecorationLine: "underline" },
  });
