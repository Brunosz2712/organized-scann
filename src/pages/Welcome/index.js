import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    return(
       <View style={styles.container}>
        
        <View style={styles.containerLogo}>
            <Animatable.Image
                animation="flipInY"
                source={require('../../assets/OS.png')}
                style={{width: "100%"}}
                resizeMode="contain"
            />
        </View>

        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>ORGANIZE, RASTREIE E ACELERE COM INTELIGENCIA!</Text>
            <Text style={styles.text}>Faça o Login para começar</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => navigation.navigate('RegisterMotorcycle')}
            >
                <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Cadastrar Motocicleta</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, styles.buttonSecondary]}
                onPress={() => navigation.navigate('RegisteredMotorcycles')}
            >
                <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Motocicletas Cadastradas</Text>
            </TouchableOpacity>

        </Animatable.View>
        
       </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#161616"
    },
    containerLogo:{
        flex: 2,
        backgroundColor:"#161616",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    containerForm:{
        flex: 1,
        backgroundColor: "#268B7D",
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
        paddingTop: 20,
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        marginTop: 28,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: 'center',
    },
    text:{
        color: "#fff",
        marginBottom: 20,
        textAlign: 'center',
    },
    button:{
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingVertical: 12,
        width: "70%",
        maxWidth: 300,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
        elevation: 3, // sombra Android
        shadowColor: "#000", // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#268B7D",
    },
    buttonSecondary: {
        backgroundColor: "#1E5F55",
    },
    buttonSecondaryText: {
        color: "#fff",
    }
});
