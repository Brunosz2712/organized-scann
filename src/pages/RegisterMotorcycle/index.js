import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../Context/AuthContext";
import { listMotorcycles, deleteMotorcycle } from "../../Services/motorcyclesService";
import { loadMotorcycles, saveMotorcycles } from "../Storage/motorcycles.js";

export default function RegisteredMotorcycles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token, signOut } = useAuth?.() || { token: null, signOut: () => {} };

  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (token) {
        const data = await listMotorcycles(token, { pageNumber: 1, pageSize: 100 });
        setMotorcycles(data || []);
        await saveMotorcycles(data || []);
      } else {
        const local = await loadMotorcycles();
        setMotorcycles(local);
      }
    } catch {
      const local = await loadMotorcycles();
      setMotorcycles(local);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (route.params?.newMotorcycle) {
      const updated = [route.params.newMotorcycle, ...motorcycles];
      setMotorcycles(updated);
      saveMotorcycles(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.newMotorcycle]);

  async function handleDelete(item) {
    if (!token) {
      Alert.alert("Atenção", "Exclusão via API requer estar logado.");
      return;
    }
    setLoadingAction(true);
    try {
      await deleteMotorcycle(item.id, token);
      const updated = motorcycles.filter(m => m.id !== item.id);
      setMotorcycles(updated);
      await saveMotorcycles(updated);
    } catch (e) {
      Alert.alert("Erro", e.message || "Não foi possível excluir.");
    } finally {
      setLoadingAction(false);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>RFID: {item.rfid}</Text>
      {!!item.portal && <Text style={styles.cardText}>Portal: {String(item.portal)}</Text>}
      {!!item.status && <Text style={styles.cardText}>Status: {item.status}</Text>}
      {!!item.entryDate && <Text style={styles.cardText}>Entrada: {String(item.entryDate).slice(0,10)}</Text>}
      {!!item.availabilityForecast && <Text style={styles.cardText}>Prev. Liberação: {String(item.availabilityForecast).slice(0,10)}</Text>}

      {token && (
        <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={() => handleDelete(item)}>
          <Text style={styles.buttonText}>Excluir (API)</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.containerLogo} />
      <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Motocicletas Cadastradas</Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 12 }} />
        ) : (
          <FlatList
            data={motorcycles}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum cadastro ainda.</Text>}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterMotorcycle')}>
          <Text style={styles.buttonText}>Cadastrar nova motocicleta</Text>
        </TouchableOpacity>

        {token ? (
          <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={signOut} disabled={loadingAction}>
            {loadingAction ? <ActivityIndicator /> : <Text style={styles.buttonText}>Logout</Text>}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.backButtonText}>Fazer login</Text>
          </TouchableOpacity>
        )}

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
    marginBottom: 8,
    alignItems: "center"
  },
  buttonText: { color: "#268B7D", fontWeight: "bold", fontSize: 16 },
  backButton: { alignItems: "center", marginBottom: 8 },
  backButtonText: { color: "#fff", textDecorationLine: "underline", fontSize: 16 },
});
