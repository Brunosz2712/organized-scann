import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../Context/AuthContext";
import { listMotorcycles, deleteMotorcycle } from "../../Services/motorcyclesService";
import { loadMotorcycles, saveMotorcycles, deleteMotorcycleLocal } from "../Storage/motorcycles.js";
import RequireAuth from "../../Components/RequireAuth";

export default function RegisteredMotorcycles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, token, signOut } = useAuth?.() || { user: null, token: null, signOut: () => {} };

  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (token) {
        const data = await listMotorcycles(token, { pageNumber: 1, pageSize: 100 });
        const arr = Array.isArray(data) ? data : [];
        setMotorcycles(arr);
        await saveMotorcycles(arr);
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
  useFocusEffect(useCallback(() => { fetchData(); }, [fetchData]));

  useEffect(() => {
    (async () => {
      const base = await loadMotorcycles();
      if (route.params?.newMotorcycle) {
        const novo = route.params.newMotorcycle;
        const merged = [novo, ...base.filter(m => String(m.id) !== String(novo.id))];
        await saveMotorcycles(merged);
        setMotorcycles(merged);
      }
      if (route.params?.updatedMotorcycle) {
        const upd = route.params.updatedMotorcycle;
        const merged = base.map(m => String(m.id) === String(upd.id) ? upd : m);
        await saveMotorcycles(merged);
        setMotorcycles(merged);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.newMotorcycle, route.params?.updatedMotorcycle]);

  async function handleDelete(item) {
    setLoadingAction(true);
    try {
      if (token) {
        await deleteMotorcycle(item.id, token);
        const updated = motorcycles.filter(m => String(m.id) !== String(item.id));
        setMotorcycles(updated);
        await saveMotorcycles(updated);
      } else {
        const updated = await deleteMotorcycleLocal(item.id);
        setMotorcycles(updated);
      }
    } catch (e) {
      Alert.alert("Erro", e.message || "Não foi possível excluir.");
    } finally {
      setLoadingAction(false);
    }
  }

  const goToRegisterMotorcycle = () => navigation.push("RegisterMotorcycle");
  const goToEdit = (item) => navigation.push("RegisterMotorcycle", { existing: item });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>RFID: {item.rfid}</Text>
      {!!item.portal && <Text style={styles.cardText}>Portal: {String(item.portal)}</Text>}
      {!!item.status && <Text style={styles.cardText}>Status: {item.status}</Text>}
      {!!item.entryDate && <Text style={styles.cardText}>Entrada: {String(item.entryDate).slice(0,10)}</Text>}
      {!!item.availabilityForecast && <Text style={styles.cardText}>Prev. Liberação: {String(item.availabilityForecast).slice(0,10)}</Text>}

      <View style={{ marginTop: 8, flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => goToEdit(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => handleDelete(item)} disabled={loadingAction}>
          {loadingAction ? <ActivityIndicator /> : <Text style={styles.buttonText}>Excluir</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.containerLogo} />
      {/* BLOQUEIO TOTAL se não estiver logado */}
      <RequireAuth redirectTo="RegisteredMotorcycles">
        <Animatable.View animation="fadeInUp" delay={500} style={styles.containerForm}>
          <Text style={styles.title}>Motocicletas Cadastradas</Text>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 12 }} />
          ) : (
            <FlatList
              data={motorcycles}
              keyExtractor={(item, idx) => (item?.id ? String(item.id) : `i-${idx}`)}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 24 }}
              ListEmptyComponent={<Text style={styles.empty}>Nenhum cadastro ainda.</Text>}
              keyboardShouldPersistTaps="handled"
            />
          )}

          <TouchableOpacity style={styles.button} onPress={goToRegisterMotorcycle}>
            <Text style={styles.buttonText}>Cadastrar nova motocicleta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.buttonText}>Ir para o Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={signOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </RequireAuth>
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
