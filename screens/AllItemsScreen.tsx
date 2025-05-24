import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { fetchWishlistItems } from "../firebaseService";
import { setItems } from "../store/wishlistSlice";

type StackNav = NativeStackNavigationProp<RootStackParamList, "AllItems">;

const AllItemsScreen = () => {
  const items = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNav>();

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const firestoreItems = await fetchWishlistItems();
          dispatch(setItems(firestoreItems));
        } catch (error) {
          console.error("Error loading items from Firestore:", error);
        }
      };

      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ItemDetail", { id: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.price}>€ {item.price}</Text>
            <Text style={styles.status}>
              {item.bought ? "✓ Bought" : "♡ In wishlist"}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Je wishlist is leeg.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  item: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  brand: { fontSize: 16, color: "#555" },
  price: { fontSize: 16, color: "#000", marginVertical: 4 },
  status: { fontWeight: "bold", color: "#c7b299" },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});

export default AllItemsScreen;
