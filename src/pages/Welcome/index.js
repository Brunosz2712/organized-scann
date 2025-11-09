import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { useThemeOS } from "../../Theme/ThemeProvider";
import ThemeToggle from "../../Components/ThemeToggle";

export default function Welcome() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme, mode } = useThemeOS();

  const styles = makeStyles({
    bg: mode === "dark" ? "#000" : "#fff",
    surface: theme.surface,
    primary: theme.primary,
    textOnSurface: theme.textOnSurface,
    textOnBg: theme.textOnBg,
  });

  const logoDark = require("../../assets/Logo.OrganizedScann.png");
  const logoLight = require("../../assets/Logo.OrganizedScann.light.png");
  const logoSrc = mode === "light" ? logoLight : logoDark;

  return (
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
        <Text style={styles.title}>{t("welcome.title")}</Text>
        <Text style={styles.text}>{t("welcome.subtitle")}</Text>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("RegisteredMotorcycles")}
        >
          <Text style={styles.buttonPrimaryText}>{t("welcome.access")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("RegisterMotorcycle")}
        >
          <Text style={styles.buttonSecondaryText}>{t("welcome.registerMotorcycle")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("RegisteredMotorcycles")}
        >
          <Text style={styles.buttonSecondaryText}>{t("welcome.registeredMotorcycles")}</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const makeStyles = (t) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: t.bg },
    containerLogo: { flex: 2, backgroundColor: t.bg, justifyContent: "center", alignItems: "center" },
    containerForm: {
      flex: 1,
      backgroundColor: t.surface,
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
      paddingStart: "5%",
      paddingEnd: "5%",
      paddingTop: 20,
      gap: 8,
    },
    title: {
      fontSize: 22,
      marginTop: 20,
      color: t.textOnSurface,
      fontWeight: "bold",
      marginBottom: 6,
      textAlign: "center",
    },
    text: { color: t.textOnSurface, opacity: 0.9, marginBottom: 16, textAlign: "center" },

    buttonPrimary: {
      backgroundColor: "#fff",
      borderRadius: 50,
      paddingVertical: 10,
      width: "70%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 8,
    },
    buttonPrimaryText: { fontSize: 18, fontWeight: "bold", color: t.primary },

    buttonSecondary: {
      backgroundColor: t.primary,
      borderRadius: 50,
      paddingVertical: 10,
      width: "70%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 6,
    },
    buttonSecondaryText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  });
