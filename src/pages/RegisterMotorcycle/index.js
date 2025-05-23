import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function RegisterMotorcycle() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastrar Motocicleta</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>RFID</Text>
                <TextInput
                    placeholder="Digite o RFID"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Placa</Text>
                <TextInput
                    placeholder="Digite a placa"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Chassi</Text>
                <TextInput
                    placeholder="Digite o chassi"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Filial</Text>
                <TextInput
                    placeholder="Digite a filial"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Status</Text>
                <TextInput
                    placeholder="Digite o status"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Portal</Text>
                <TextInput
                    placeholder="Digite o portal"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity style={styles.button}>
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