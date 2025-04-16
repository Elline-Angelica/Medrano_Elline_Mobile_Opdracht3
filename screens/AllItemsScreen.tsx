import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "../components/Card";
import { useWishlist } from "../context/WishlistContext"; // gebruik de context

const AllItemsScreen = ({ navigation }: any) => {
  const { items, toggleBought } = useWishlist(); // haal items en toggle functie op

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Card
          item={item}
          onPress={() => navigation.navigate("ItemDetail", { item })}
          onToggleBought={toggleBought}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 10 },
});

export default AllItemsScreen;
