import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const navigation = useNavigation();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        const userData = { fullName, email, password };

        try {
            await AsyncStorage.setItem('@user_data', JSON.stringify(userData));  // Salva no AsyncStorage
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                { text: "OK", onPress: () => navigation.navigate("SignIn") } // Navega para SignIn após OK
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar os dados.");
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Crie sua conta</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Nome completo</Text>
                <TextInput
                    placeholder="Digite seu nome completo"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    secureTextEntry
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.title}>Confirmar senha</Text>
                <TextInput
                    placeholder="Confirme sua senha"
                    style={styles.input}
                    secureTextEntry
                    placeholderTextColor="#ccc"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Welcome")}>
                    <Text style={styles.backButtonText}>Voltar para o início</Text>
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
