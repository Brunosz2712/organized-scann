import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadMotorcycles, saveMotorcycles } from "../Storage/motorcycles";

export default function RegisteredMotorcycles() {
  const navigation = useNavigation();
  const route = useRoute();
  const [motorcycles, setMotorcycles] = useState([]);

  useEffect(() => {
    loadMotorcycles().then(setMotorcycles);
  }, []);

  useEffect(() => {
    if (route.params?.newMotorcycle) {
      const updated = [route.params.newMotorcycle, ...motorcycles];
      setMotorcycles(updated);
      saveMotorcycles(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.newMotorcycle]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>RFID: {item.rfid}</Text>
      <Text style={styles.cardText}>Chassi: {item.chassi}</Text>
      <Text style={styles.cardText}>Filial: {item.filial}</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
      <Text style={styles.cardText}>Portal: {item.portal}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.containerLogo} />
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Motocicletas Cadastradas</Text>

        <FlatList
          data={motorcycles}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum cadastro ainda.</Text>}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterMotorcycle')}>
          <Text style={styles.buttonText}>Cadastrar nova motocicleta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161616" },
  containerLogo: { flex: 1, backgroundColor: "#161616" },
  containerForm: {
    flex: 2,
    backgroundColor: "#268B7D",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 24
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  empty: { color: "#fff", opacity: 0.85, marginTop: 10 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 12, marginTop: 10 },
  cardTitle: { color: "#268B7D", fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  cardText: { color: "#333" },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 16,
    alignItems: "center"
  },
  buttonText: { color: "#268B7D", fontWeight: "bold", fontSize: 16 },
  backButton: { alignItems: "center", marginBottom: 8 },
  backButtonText: { color: "#fff", textDecorationLine: "underline", fontSize: 16 },
});
