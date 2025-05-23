import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RegisteredMotorcycles() {
  const navigation = useNavigation();
  const route = useRoute();
  const [motorcycles, setMotorcycles] = useState([
    { id: "1", rfid: "123456789", placa: "ABC-1234", chassi: "XYZ987654321", filial: "São Paulo", status: "Ativa", portal: "Portal A" },
    { id: "2", rfid: "987654321", placa: "DEF-5678", chassi: "ABC123456789", filial: "Rio de Janeiro", status: "Inativa", portal: "Portal B" },
  ]);

  // Se houver nova moto, adiciona ao estado
  useEffect(() => {
    if (route.params?.newMotorcycle) {
      setMotorcycles(prev => [route.params.newMotorcycle, ...prev]);
    }
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
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        {/* Pode adicionar uma imagem/logo aqui */}
      </View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Motocicletas Cadastradas</Text>

        <FlatList
          data={motorcycles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>Voltar para o início</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  containerLogo: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 2,
    backgroundColor: "#268B7D",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: "5%",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1E5F55",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardText: {
    color: "#fff",
    marginBottom: 2,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 55,
    alignItems: "center",
  },
  buttonText: {
    color: "#268B7D",
    fontWeight: "bold",
    fontSize: 16,
  },
});
