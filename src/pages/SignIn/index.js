import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function SignIn({ navigation }) {
    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    placeholderTextColor="#ccc"
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    secureTextEntry
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>

                {/* Botão para voltar para a tela Welcome */}
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.navigate('Welcome')}
                >
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
        marginTop: '38%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 40,
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
        marginTop: 28,
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
        paddingVertical: 8,
        marginTop: 14,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: "center"
        
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        textDecorationLine: "underline"
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