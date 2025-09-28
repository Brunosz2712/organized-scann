import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../Context/AuthContext";

const USERS_KEY = '@users';

export default function SignIn() {
  const navigation = useNavigation();
  const route = useRoute();
  const redirectTo = route.params?.redirectTo || null;   // "RegisterMotorcycle" | "RegisteredMotorcycles"
  const prefillEmail = route.params?.prefillEmail || "";

  const { signIn, signInLocal } = useAuth?.() || {};
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function normalize(s) { return String(s || "").trim().toLowerCase(); }

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }
    setLoading(true);

    // 1) Tenta API (se estiver configurada)
    if (typeof signIn === "function") {
      try {
        await signIn(email, password);
        setLoading(false);
        // vai para o alvo desejado, senão Welcome
        navigation.reset({ index: 0, routes: [{ name: redirectTo || 'Welcome' }] });
        return;
      } catch (e) {
        // cai para o login local
      }
    }

    // 2) Fallback local (@users)
    try {
      const raw = await AsyncStorage.getItem(USERS_KEY);
      const users = raw ? JSON.parse(raw) : [];
      const existing = users.find(u => normalize(u.email) === normalize(email));

      if (!existing) {
        setLoading(false);
        Alert.alert(
          "Conta não encontrada",
          "Você ainda não tem cadastro. Vamos criar agora?",
          [{ text: "OK", onPress: () => navigation.navigate("Register", { prefillEmail: email, redirectTo }) }],
          { cancelable: false }
        );
        return;
      }

      if (existing.password !== password) {
        setLoading(false);
        Alert.alert("Erro", "Senha inválida.");
        return;
      }

      // autentica localmente no contexto
      await signInLocal?.({ name: existing.fullName || existing.name || "Usuário", email: existing.email });
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: redirectTo || 'Welcome' }] });
    } catch (e) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível autenticar.");
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor="#ccc"
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
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
          {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.backButtonText}>Criar uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.backButtonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161616" },
  containerHeader: { marginTop: '25%', marginBottom: '8%', paddingStart: '5%' },
  message: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  containerForm: {
    flex: 1, backgroundColor: "#268B7D", borderTopEndRadius: 25, borderTopStartRadius: 25,
    paddingStart: "5%", paddingEnd: "5%", paddingTop: 20,
  },
  title: { fontSize: 20, marginTop: 20, color: "#fff" },
  input: { borderBottomWidth: 1, height: 40, marginBottom: 12, fontSize: 16, color: "#fff" },
  button: {
    backgroundColor: "#1E5F55", width: "100%", borderRadius: 4, paddingVertical: 10,
    marginTop: 20, alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 15, alignItems: "center" },
  backButtonText: { color: "#fff", fontSize: 16, textDecorationLine: "underline" },
});
