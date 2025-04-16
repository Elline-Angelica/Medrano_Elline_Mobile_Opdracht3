import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WishlistItem } from "../types/wishlist";

const Card = ({
  item,
  onPress,
  onToggleBought,
}: {
  item: WishlistItem;
  onPress: () => void;
  onToggleBought: (id: string) => void;
}) => (
  <View style={styles.card}>
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => onToggleBought(item.id)}
      style={styles.boughtContainer}
    >
      <Ionicons
        name={item.bought ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={item.bought ? "green" : "grey"}
      />
      {item.bought && <Text style={styles.boughtText}>Bought</Text>}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  brand: { fontSize: 14, color: "#555" },
  price: { fontSize: 14, marginBottom: 8 },
  boughtContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  boughtText: {
    marginLeft: 6,
    color: "green",
    fontWeight: "600",
  },
});

export default Card;
