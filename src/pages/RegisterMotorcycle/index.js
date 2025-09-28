import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from "../../Context/AuthContext";
import { createMotorcycle, updateMotorcycle } from "../../Services/motorcyclesService";
import { addMotorcycle, loadMotorcycles, saveMotorcycles } from "../Storage/motorcycles.js";
import RequireAuth from "../../Components/RequireAuth";

export default function RegisterMotorcycle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = useAuth?.() || { token: null };

  const existing = route.params?.existing || null;

  const [rfid, setRfid] = useState('');
  const [placa, setPlaca] = useState('');
  const [chassi, setChassi] = useState('');
  const [filial, setFilial] = useState('');
  const [status, setStatus] = useState('');
  const [portal, setPortal] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setRfid(existing.rfid || "");
      setPlaca(existing.placa || "");
      setChassi(existing.chassi || "");
      setFilial(existing.filial || "");
      setStatus(existing.status || "");
      setPortal(String(existing.portal || ""));
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
      portal: portal.trim(), // service gera portalId automático
    };

    setSubmitting(true);
    try {
      if (existing) {
        if (token) {
          const updated = await updateMotorcycle(existing.id, payload, token);
          Alert.alert('Sucesso', 'Motocicleta atualizada (API)!');
          navigation.navigate('RegisteredMotorcycles', { updatedMotorcycle: updated });
        } else {
          const list = await loadMotorcycles();
          const updated = { ...existing, ...payload };
          const newList = list.map(m => String(m.id) === String(existing.id) ? updated : m);
          await saveMotorcycles(newList);
          Alert.alert('Sucesso', 'Motocicleta atualizada (local)!');
          navigation.navigate('RegisteredMotorcycles', { updatedMotorcycle: updated });
        }
      } else {
        if (token) {
          const created = await createMotorcycle(payload, token);
          Alert.alert('Sucesso', 'Motocicleta cadastrada (API)!');
          navigation.navigate('RegisteredMotorcycles', { newMotorcycle: created });
        } else {
          const local = { ...payload, id: Date.now().toString() };
          await addMotorcycle(local);
          Alert.alert('Sucesso', 'Motocicleta cadastrada (local)!');
          navigation.navigate('RegisteredMotorcycles', { newMotorcycle: local });
        }
      }
    } catch (e) {
      setError(e.message || "Erro ao salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>{existing ? "Editar Motocicleta" : "Cadastrar Motocicleta"}</Text>
      </Animatable.View>

      {/* BLOQUEIO TOTAL se não estiver logado */}
      <RequireAuth redirectTo="RegisterMotorcycle">
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
              {[
                { label: "RFID", value: rfid, setter: setRfid, placeholder: "Digite o rfid" },
                { label: "Placa", value: placa, setter: setPlaca, placeholder: "Digite a placa" },
                { label: "Chassi", value: chassi, setter: setChassi, placeholder: "Digite o chassi" },
                { label: "Filial (opcional)", value: filial, setter: setFilial, placeholder: "Digite a filial" },
                { label: "Status/Problema", value: status, setter: setStatus, placeholder: "Descreva o status" },
                { label: "Portal (nome, para cores)", value: portal, setter: setPortal, placeholder: "Ex.: 1 / Azul / A" },
              ].map((field, idx) => (
                <React.Fragment key={idx}>
                  <Text style={styles.title}>{field.label}</Text>
                  <TextInput
                    placeholder={field.placeholder}
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    value={field.value}
                    onChangeText={field.setter}
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
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>
      </RequireAuth>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161616" },
  containerHeader: { marginTop: '25%', marginBottom: '8%', paddingStart: '5%' },
  message: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  containerForm: {
    flex: 1,
    backgroundColor: "#268B7D",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: 24
  },
  title: { color: "#fff", fontSize: 20, marginTop: 20 },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 8
  },
  button: {
    backgroundColor: "#1E5F55",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 15, alignItems: "center" },
  backButtonText: { color: "#fff", fontSize: 16, textDecorationLine: "underline" }
});
