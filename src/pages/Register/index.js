import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";
import { registerService } from "../../Services/authService";

export default function Register() {
  const navigation = useNavigation();
  const { theme } = useThemeOS();
  const styles = makeStyles(theme);

  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister() {
    const _fullName = fullName.trim();
    const _email    = email.trim().toLowerCase();
    const _password = password;

    if (!_fullName || !_email || !_password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_email)) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }
    if (_password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (_password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerService({ name: _fullName, email: _email, password: _password });
      const token = res?.token ?? null;

      if (token) {
        Alert.alert("Sucesso", "Cadastro concluído!", [
          { text: "OK", onPress: () => navigation.replace("RegisteredMotorcycles") },
        ]);
      } else {
        Alert.alert("Sucesso", "Cadastro realizado! Faça login para continuar.", [
          { text: "OK", onPress: () => navigation.navigate("SignIn") },
        ]);
      }
    } catch (e) {
      const msg = e?.message?.replace(/^Erro na API:\s*/i, "") || "Falha ao registrar. Tente novamente.";
      Alert.alert("Erro", msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <ThemeToggle />
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Crie sua conta</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome completo</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          style={styles.input}
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.title}>Confirmar senha</Text>
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={submitting}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
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
