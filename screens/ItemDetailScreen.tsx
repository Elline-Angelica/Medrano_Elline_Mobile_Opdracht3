import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleBought, removeItem } from "../store/wishlistSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import {
  deleteWishlistItem,
  toggleBoughtInFirestore,
} from "../firebaseService";

import Header from "../components/Header";

type ItemDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ItemDetail"
>;

const ItemDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<ItemDetailScreenNavigationProp>();
  const dispatch = useDispatch();

  const { id } = route.params as { id: string };
  const item = useSelector((state: RootState) =>
    state.wishlist.items.find((i) => i.id === id)
  );

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item niet gevonden.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Brand: {item.brand}</Text>
      <Text>Price: € {item.price}</Text>
      <Text style={styles.status}>
        Status: {item.bought ? "✓ Bought" : "♡ In wishlist"}
      </Text>

      <View style={styles.buttonGroup}>
        <Button
          title={item.bought ? "Set as 'In Wishlist'" : "Set as 'Bought"}
          onPress={() => {
            dispatch(toggleBought(id)); // lokaal
            toggleBoughtInFirestore(id, item.bought); // sync naar Firestore
          }}
        />
        <View style={{ height: 10 }} />
        <Button
          title="Delete item"
          color="red"
          onPress={() => {
            dispatch(removeItem(id)); // optioneel lokaal
            deleteWishlistItem(id);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  status: { fontWeight: "bold" },
  buttonGroup: { marginTop: 20 },
});

export default ItemDetailScreen;
