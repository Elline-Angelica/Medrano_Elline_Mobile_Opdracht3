import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = ({ title, canGoBack, navigation }: any) => {
  const boughtCount = useSelector(
    (state: RootState) =>
      state.wishlist.items.filter((item) => item.bought).length
  );

  return (
    <View style={styles.header}>
      <Image source={require("../assets/header-bg.jpg")} style={styles.bg} />
      {canGoBack && (
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>

      <View style={styles.counter}>
        <Text style={styles.counterText}>✓ {boughtCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 110,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  back: { position: "absolute", top: 50, left: 20 },
  icon: { width: 30, height: 30, marginBottom: 4 },
  title: { fontSize: 22, color: "#c7b299", fontWeight: "bold" },
  counter: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#c7b299",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: { color: "#fff", fontSize: 14 },
});

export default Header;
