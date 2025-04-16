import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { WISHLIST } from "../data/dummy-data";
import Card from "../components/Card";
import { useFocusEffect } from "@react-navigation/native";

const AllItemsScreen = ({ navigation, route }: any) => {
  const [items, setItems] = useState(WISHLIST);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.newItem) {
        setItems((prevItems) => [...prevItems, route.params.newItem]);
        route.params.newItem = null;
      }
    }, [route.params?.newItem])
  );

  const toggleBought = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

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
