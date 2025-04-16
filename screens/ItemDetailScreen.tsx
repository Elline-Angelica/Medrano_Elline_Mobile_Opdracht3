import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemDetailScreen = ({ route }: any) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.status}>
        {item.bought ? "Gekocht" : "Nog niet gekocht"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  brand: { fontSize: 20 },
  price: { fontSize: 18, color: "#666" },
  status: { fontSize: 16, marginTop: 10 },
});

export default ItemDetailScreen;
