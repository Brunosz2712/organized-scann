import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function RegisterMotorcycle() {
    const navigation = useNavigation();

    const [rfid, setRfid] = useState('');
    const [placa, setPlaca] = useState('');
    const [chassi, setChassi] = useState('');
    const [filial, setFilial] = useState('');
    const [status, setStatus] = useState('');
    const [portal, setPortal] = useState('');

    function handleRegister() {
        if (!rfid || !placa || !chassi || !filial || !status || !portal) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        const newMotorcycle = {
            id: String(Date.now()),
            rfid,
            placa,
            chassi,
            filial,
            status,
            portal
        };

        navigation.navigate('RegisteredMotorcycles', { newMotorcycle });
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastrar Motocicleta</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                {[ // campos de entrada
                    { label: "RFID", value: rfid, setter: setRfid },
                    { label: "Placa", value: placa, setter: setPlaca },
                    { label: "Chassi", value: chassi, setter: setChassi },
                    { label: "Filial", value: filial, setter: setFilial },
                    { label: "Status", value: status, setter: setStatus },
                    { label: "Portal", value: portal, setter: setPortal },
                ].map((field, idx) => (
                    <React.Fragment key={idx}>
                        <Text style={styles.title}>{field.label}</Text>
                        <TextInput
                            placeholder={`Digite o ${field.label.toLowerCase()}`}
                            style={styles.input}
                            placeholderTextColor="#ccc"
                            value={field.value}
                            onChangeText={field.setter}
                        />
                    </React.Fragment>
                ))}

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastrar Moto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161616"
    },
    containerHeader: {
        marginTop: '25%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#268B7D",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        color: "#fff",
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        color: "#fff"
    },
    button: {
        backgroundColor: "#1E5F55",
        width: "100%",
        borderRadius: 4,
        paddingVertical: 10,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    backButton: {
        marginTop: 15,
        alignItems: "center"
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline"
    }
});

