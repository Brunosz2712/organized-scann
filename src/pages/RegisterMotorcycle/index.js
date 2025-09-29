import React, { useEffect, useState } from "react";
import {
  Text, StyleSheet, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, View
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";

import { createMotorcycle, updateMotorcycle } from "../../Services/motorcyclesService";
import { logout as clearSession } from "../Storage/auth";

export default function RegisterMotorcycle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useThemeOS();
  const styles = makeStyles(theme);

  const existing = route.params?.existing || null;

  const [rfid, setRfid] = useState("");
  const [placa, setPlaca] = useState("");
  const [chassi, setChassi] = useState("");
  const [filial, setFilial] = useState("");
  const [status, setStatus] = useState("");
  const [portal, setPortal] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setRfid(existing.rfid || "");
      setPlaca(existing.placa || "");
      setChassi(existing.chassi || "");
      setFilial(existing.filial || "");
      setStatus(existing.status || "");
      setPortal(existing.portal || "");
    }
  }, [existing]);

  async function handleSubmit() {
    setError("");
    if (!rfid.trim() || !placa.trim()) {
      setError("Preencha ao menos RFID e Placa.");
      return;
    }

    const payload = {
      rfid: rfid.trim(),
      placa: placa.trim(),
      chassi: chassi.trim(),
      filial: filial.trim(),
      status: status.trim(),
      portal: portal.trim(),
    };

    setSubmitting(true);
    try {
      if (existing) {
        const updated = await updateMotorcycle(existing.id, payload, null);
        Alert.alert("Sucesso", "Motocicleta atualizada!");
        navigation.navigate("RegisteredMotorcycles", { updatedMotorcycle: updated });
      } else {
        const created = await createMotorcycle(payload, null);
        Alert.alert("Sucesso", "Motocicleta cadastrada!");
        navigation.navigate("RegisteredMotorcycles", { newMotorcycle: created });
      }
    } catch (e) {
      setError(e?.message || "Erro ao salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await clearSession();
    Alert.alert("Pronto", "Você saiu da conta.", [
      { text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: "SignIn" }] }) }
    ]);
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ThemeToggle />
      <View style={styles.containerHeader}>
        <Text style={styles.message}>{existing ? "Editar Motocicleta" : "Cadastrar Motocicleta"}</Text>
      </View>

      <View style={styles.containerForm}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            {[
              { label: "RFID", value: rfid, setter: setRfid, placeholder: "Digite o RFID" },
              { label: "Placa", value: placa, setter: setPlaca, placeholder: "Digite a placa" },
              { label: "Chassi", value: chassi, setter: setChassi, placeholder: "Digite o chassi" },
              { label: "Filial (opcional)", value: filial, setter: setFilial, placeholder: "Digite a filial" },
              { label: "Status/Problema", value: status, setter: setStatus, placeholder: "Descreva o status" },
              { label: "Portal (cores)", value: portal, setter: setPortal, placeholder: "Ex.: Azul, Laranja, 1, 2..." },
            ].map((f, idx) => (
              <React.Fragment key={idx}>
                <Text style={styles.title}>{f.label}</Text>
                <TextInput
                  placeholder={f.placeholder}
                  style={styles.input}
                  placeholderTextColor="#999"
                  value={f.value}
                  onChangeText={f.setter}
                />
              </React.Fragment>
            ))}

            {!!error && <Text style={{ color: "#ffdddd", marginTop: 8 }}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
              {submitting ? <ActivityIndicator /> : <Text style={styles.buttonText}>{existing ? "Salvar Alterações" : "Cadastrar Moto"}</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
              <Text style={styles.backButtonText}>Ir para o Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (t) => StyleSheet.create({
  container: { flex: 1, backgroundColor: t.bg },
  containerHeader: { marginTop: '25%', marginBottom: '8%', paddingStart: '5%' },
  message: { fontSize: 28, fontWeight: "bold", color: t.textOnBg },
  containerForm: {
    flex: 1,
    backgroundColor: t.surface,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 24
  },
  title: { color: t.textOnSurface, fontSize: 20, marginTop: 20 },
  input: { backgroundColor: "#fff", width: "100%", borderRadius: 4, paddingHorizontal: 10, height: 40, marginTop: 8 },
  button: { backgroundColor: t.primary, width: "100%", borderRadius: 4, paddingVertical: 10, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 15, alignItems: "center" },
  backButtonText: { color: t.textOnSurface, fontSize: 16, textDecorationLine: "underline" }
});
