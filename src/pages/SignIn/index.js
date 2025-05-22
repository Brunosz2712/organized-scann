import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorSenha, setErrorSenha] = useState('');

  // Função que valida email via regex simples
  const validarEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  const handleRegister = () => {
    let valid = true;

    // Limpa erros antes de validar
    setErrorEmail('');
    setErrorSenha('');

    // Valida email
    if (!email) {
      setErrorEmail('O e-mail é obrigatório');
      valid = false;
    } else if (!validarEmail(email)) {
      setErrorEmail('Digite um e-mail válido');
      valid = false;
    }

    // Valida senha
    if (!senha) {
      setErrorSenha('A senha é obrigatória');
      valid = false;
    } else if (senha.length < 6) {
      setErrorSenha('A senha deve ter no mínimo 6 caracteres');
      valid = false;
    }

    if (valid) {
      // Aqui você pode adicionar chamada à API para cadastro real
      // Depois, navegue para a tela Home
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre-se</Text>
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
        {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#ccc"
          value={senha}
          onChangeText={setSenha}
        />
        {errorSenha ? <Text style={styles.errorText}>{errorSenha}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar para login</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616"
  },
  containerHeader: {
    marginTop: '38%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#268B7D",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 4,
    fontSize: 16,
    color: "#fff"
  },
  errorText: {
    color: 'yellow',
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1E5F55",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  backButton: {
    marginTop: 15,
    alignItems: "center"
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline"
  }
});
