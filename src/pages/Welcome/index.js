import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";

export default function Welcome() {
  const navigation = useNavigation();
  const { theme, mode } = useThemeOS();

  const styles = makeStyles({
    bg: mode === "dark" ? "#000" : "#fff",
    surface: theme.surface,
    primary: theme.primary,
  });

  // ✅ ajuste os nomes exatamente como estão em src/assets
  const logoDark = require("../../assets/Logo.OrganizedScann.png");
  const logoLight = require("../../assets/Logo.OrganizedScann.light.png"); // <- trocado (sem .hd)

  const logoSrc = mode === "light" ? logoLight : logoDark;

  return(
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ThemeToggle />

      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={logoSrc}
          style={{ width: "100%", height: "85%" }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>ORGANIZE, RASTREIE E ACELERE COM INTELIGENCIA!</Text>
        <Text style={styles.text}>Faça o Login para começar</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.navigate('RegisterMotorcycle')}>
          <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Cadastrar Motocicleta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.navigate('RegisteredMotorcycles')}>
          <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Motocicletas Cadastradas</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const makeStyles = (t) => StyleSheet.create({
  container:{ flex: 1, backgroundColor: t.bg },
  containerLogo:{ flex: 2, backgroundColor: t.bg, justifyContent: "center", alignItems: "center" },
  containerForm:{
    flex: 1,
    backgroundColor: t.surface,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingTop: 20,
  },
  title:{ fontSize: 24, marginTop: 28, color: "#fff", fontWeight: "bold", marginBottom: 12 },
  text:{ color: "#fff", marginBottom: 20 },
  button:{
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText:{ fontSize: 18, fontWeight: "bold", color: "#268B7D" },
  buttonSecondary: { backgroundColor: "#1E5F55" },
  buttonSecondaryText: { color: "#fff" },
});
