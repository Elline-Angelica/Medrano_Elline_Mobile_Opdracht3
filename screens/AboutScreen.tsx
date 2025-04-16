import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Luxury Wishlist App</Text>
    <Text style={styles.text}>Versie 1.0</Text>
    <Text style={styles.text}>Gemaakt voor Mobile Opdracht 3</Text>
    <Text style={styles.text}>Door Elline Medrano</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 16, marginTop: 8 },
});

export default AboutScreen;
