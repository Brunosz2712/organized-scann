import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";

import { listMotorcycles, deleteMotorcycle } from "../../Services/motorcyclesService";
import { saveMotorcycles } from "../Storage/motorcycles.js";
import { logout as clearSession } from "../Storage/auth";

export default function RegisteredMotorcycles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useThemeOS();
  const styles = makeStyles(theme);

  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listMotorcycles(null, { pageNumber: 1, pageSize: 100 });
      setMotorcycles(Array.isArray(data) ? data : []);
      await saveMotorcycles(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert("Erro", e.message || "Falha ao carregar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const n = route.params?.newMotorcycle;
    const u = route.params?.updatedMotorcycle;
    if (!n && !u) return;
    setMotorcycles(prev => {
      let out = Array.isArray(prev) ? prev.slice() : [];
      if (n) out = [n, ...out.filter(m => String(m.id) !== String(n.id))];
      if (u) out = out.map(m => String(m.id) === String(u.id) ? u : m);
      saveMotorcycles(out);
      return out;
    });
    navigation.setParams({ newMotorcycle: undefined, updatedMotorcycle: undefined });
  }, [route.params?.newMotorcycle, route.params?.updatedMotorcycle, navigation]);

  async function handleDelete(item) {
    setLoadingAction(true);
    try {
      await deleteMotorcycle(item.id, null);
      setMotorcycles(prev => prev.filter(m => String(m.id) !== String(item.id)));
    } catch (e) {
      Alert.alert("Erro", e.message || "Não foi possível excluir.");
    } finally {
      setLoadingAction(false);
    }
  }

  const goToRegister = () => navigation.navigate("RegisterMotorcycle");
  const goToEdit = (item) => navigation.navigate("RegisterMotorcycle", { existing: item });

  async function handleLogout() {
    await clearSession();
    Alert.alert("Pronto", "Você saiu da conta.", [
      { text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: "SignIn" }] }) }
    ]);
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Placa: {item.placa}</Text>
      <Text style={styles.cardText}>RFID: {item.rfid}</Text>
      {!!item.status && <Text style={styles.cardText}>Status: {item.status}</Text>}
      {!!item.portal && <Text style={styles.cardText}>Portal: {String(item.portal)}</Text>}

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
      <ThemeToggle />
      <View style={styles.containerLogo} />
      <View style={styles.containerForm}>
        <Text style={styles.title}>Motocicletas Cadastradas</Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 12 }} />
        ) : (
          <FlatList
            data={motorcycles}
            keyExtractor={(item, idx) => String(item?.id ?? idx)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum cadastro ainda.</Text>}
            keyboardShouldPersistTaps="handled"
          />
        )}

        <TouchableOpacity style={styles.button} onPress={goToRegister}>
          <Text style={styles.buttonText}>Cadastrar nova motocicleta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.backButtonText}>Ir para o Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (t) => StyleSheet.create({
  container: { flex: 1, backgroundColor: t.bg },
  containerLogo: { flex: 1, backgroundColor: t.bg },
  containerForm: {
    flex: 2,
    backgroundColor: t.surface,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 24
  },
  title: { color: t.textOnSurface, fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  empty: { color: t.textOnSurface, opacity: 0.85, marginTop: 10 },
  card: { backgroundColor: t.cardBg, borderRadius: 10, padding: 12, marginTop: 10 },
  cardTitle: { color: t.cardTitle, fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  cardText: { color: t.cardText },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 8,
    alignItems: "center"
  },
  buttonText: { color: t.cardTitle, fontWeight: "bold", fontSize: 16 },
  backButton: { alignItems: "center", marginBottom: 8 },
  backButtonText: { color: t.textOnSurface, textDecorationLine: "underline", fontSize: 16 },
});
