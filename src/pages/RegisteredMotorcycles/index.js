import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../Context/AuthContext";
import { createMotorcycle } from "../../Services/motorcyclesService";
import { addMotorcycle } from "../Storage/motorcycles.js";

export default function RegisterMotorcycle() {
  const navigation = useNavigation();
  const { token } = useAuth?.() || { token: null };

  const [rfid, setRfid] = useState('');
  const [placa, setPlaca] = useState('');
  const [chassi, setChassi] = useState(''); // não usado na API, mas mantido no form
  const [filial, setFilial] = useState(''); // pode servir como PortalId
  const [status, setStatus] = useState(''); // mapeado para ProblemDescription
  const [portal, setPortal] = useState(''); // PortalId (preferencial)
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");
    if (!rfid || !placa) {
      setError("Preencha ao menos RFID e Placa.");
      return;
    }

    // Monta payload no formato da API (ver Services/motorcyclesService.js)
    const payload = {
      rfid: rfid.trim(),
      placa: placa.trim(),
      chassi: chassi.trim(),
      filial: filial.trim(),
      status: status.trim(),
      portal: portal.trim() || filial.trim() || "1", // PortalId
    };

    setSubmitting(true);
    try {
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
    } catch (e) {
      setError(e.message || "Erro ao cadastrar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastrar Motocicleta</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            {[
              { label: "RFID", value: rfid, setter: setRfid },
              { label: "Placa", value: placa, setter: setPlaca },
              { label: "Chassi", value: chassi, setter: setChassi },
              { label: "Filial (opcional)", value: filial, setter: setFilial },
              { label: "Status/Problema", value: status, setter: setStatus },
              { label: "PortalId (número)", value: portal, setter: setPortal },
            ].map((field, idx) => (
              <React.Fragment key={idx}>
                <Text style={styles.title}>{field.label}</Text>
                <TextInput
                  placeholder={`Digite ${field.label.toLowerCase()}`}
                  style={styles.input}
                  placeholderTextColor="#ccc"
                  value={field.value}
                  onChangeText={field.setter}
                />
              </React.Fragment>
            ))}

            {!!error && <Text style={{ color: "#ffdddd", marginTop: 8 }}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={submitting}>
              {submitting ? <ActivityIndicator /> : <Text style={styles.buttonText}>Cadastrar Moto</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animatable.View>
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
