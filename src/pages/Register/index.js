import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
  const navigation = useNavigation();

  // Estados dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para carregar dados salvos (se houver)
  useEffect(() => {
    async function loadData() {
      try {
        const savedName = await AsyncStorage.getItem('@register_name');
        const savedEmail = await AsyncStorage.getItem('@register_email');
        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
      } catch (error) {
        console.log('Erro ao carregar dados:', error);
      }
    }
    loadData();
  }, []);

  // Função para salvar dados no AsyncStorage
  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await AsyncStorage.setItem('@register_name', name);
      await AsyncStorage.setItem('@register_email', email);
      await AsyncStorage.setItem('@register_password', password); // cuidado com segurança real!

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      // Limpar campos após cadastro
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Navegar para tela Welcome ou outra que desejar
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Crie sua conta</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Nome completo</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <Text style={styles.title}>Confirmar senha</Text>
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#ccc"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.backButtonText}>Voltar para o início</Text>
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
      marginTop: '25%',
      marginBottom: '8%',
      paddingStart: '5%',
  },
  message: {
      fontSize: 30,
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
      marginTop: 20,
      color: "#fff",
  },
  input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      color: "#fff"
  },
  button: {
      backgroundColor: "#1E5F55",
      width: "100%",
      borderRadius: 4,
      paddingVertical: 10,
      marginTop: 20,
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
