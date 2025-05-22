import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@motorcycles_list';

export default function RegisterMotorcycle({ navigation }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  const handleCadastro = async () => {
    if (!marca || !modelo || !ano) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const currentList = storedData ? JSON.parse(storedData) : [];

      const newList = [...currentList, { marca, modelo, ano }];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

      setMarca('');
      setModelo('');
      setAno('');

      Alert.alert('Sucesso', 'Motocicleta cadastrada!', [
        { text: 'OK', onPress: () => navigation.navigate('RegisteredMotorcycles') },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a motocicleta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Motocicleta</Text>

      <TextInput
        placeholder="Marca"
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        placeholder="Modelo"
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        placeholder="Ano"
        style={styles.input}
        keyboardType="numeric"
        value={ano}
        onChangeText={setAno}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#268B7D', padding:20, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20, color:'#fff', textAlign:'center' },
  input: {
    backgroundColor:'#fff',
    borderRadius:6,
    padding:12,
    marginBottom:15,
    fontSize:16,
  },
  button: {
    backgroundColor:'#1E5F55',
    paddingVertical:12,
    borderRadius:50,
    alignItems:'center',
  },
  buttonText: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
  },
  backButton: {
    marginTop:15,
    alignItems:'center',
  },
  backButtonText: {
    color:'#fff',
    textDecorationLine:'underline',
    fontSize:16,
  },
});
