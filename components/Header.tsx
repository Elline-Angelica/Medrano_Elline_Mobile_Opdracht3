import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title, canGoBack, navigation }: any) => (
  <View style={styles.header}>
    <Image source={require("../assets/header-bg.jpg")} style={styles.bg} />
    {canGoBack && (
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    )}
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 120,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  back: { position: "absolute", top: 50, left: 10 },
  icon: { width: 30, height: 30, marginBottom: 4 },
  title: { fontSize: 22, color: "#c7b299", fontWeight: "bold" },
});

export default Header;
