import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@motorcycles_list';

export default function RegisteredMotorcycles({ navigation }) {
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMotorcycles();
    });
    return unsubscribe;
  }, [navigation]);

  const loadMotorcycles = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setMotorcycles(JSON.parse(storedData));
      } else {
        setMotorcycles([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as motocicletas.');
    }
  };

  const deleteMotorcycle = (index) => {
    Alert.alert(
      'Excluir Motocicleta',
      'Tem certeza que deseja excluir essa motocicleta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const updatedList = [...motorcycles];
            updatedList.splice(index, 1);
            setMotorcycles(updatedList);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
          }
        }
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.text}><Text style={styles.label}>Marca:</Text> {item.marca}</Text>
      <Text style={styles.text}><Text style={styles.label}>Modelo:</Text> {item.modelo}</Text>
      <Text style={styles.text}><Text style={styles.label}>Ano:</Text> {item.ano}</Text>

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteMotorcycle(index)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motocicletas Cadastradas</Text>

      {motorcycles.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma motocicleta cadastrada.</Text>
      ) : (
        <FlatList
          data={motorcycles}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#268B7D', padding:20 },
  title: { fontSize:26, fontWeight:'bold', color:'#fff', marginBottom:20, textAlign:'center' },
  card: { backgroundColor:'#1E5F55', borderRadius:10, padding:15, marginBottom:15 },
  text: { color:'#fff', fontSize:18, marginBottom:6 },
  label: { fontWeight:'bold' },
  deleteButton: {
    marginTop:10,
    backgroundColor:'#161616',
    paddingVertical:6,
    borderRadius:6,
    alignItems:'center',
  },
  deleteButtonText: { color:'#ff6666', fontWeight:'bold', fontSize:16 },
  emptyText: { color:'#fff', fontSize:18, textAlign:'center', marginTop:50 },
  backButton: { marginTop:20, alignItems:'center' },
  backButtonText: { color:'#fff', fontSize:16, textDecorationLine:'underline' },
});
