import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuthUser } from "../context/AuthUserContext";

const AboutScreen = () => {
  const user = useAuthUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert("Logout failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luxury Wishlist App</Text>
      <Text style={styles.subtitle}>Versie 3.0</Text>
      <Text style={styles.subtitle}>Gemaakt door Elline Medrano</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>👤 Naam:</Text>
        <Text style={styles.infoValue}>{user?.displayName || "–"}</Text>

        <Text style={styles.infoLabel}>📧 Email:</Text>
        <Text style={styles.infoValue}>
          {user?.email || (user?.isAnonymous ? "(anoniem)" : "–")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ede4db",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#c7b299",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  infoBox: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#c7b299",
  },
  infoValue: {
    marginBottom: 12,
    color: "#333",
  },
  button: {
    backgroundColor: "#ede4db",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7b299",
    width: "100%",
  },
  buttonText: {
    color: "#c7b299",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AboutScreen;
