import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/wishlistSlice";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/store";
import { addWishlistItem } from "../firebaseService";
import Header from "../components/Header";

const NewItemScreen = () => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state: RootState) => state.wishlist.items);

  const handleAdd = async () => {
    const trimmedTitle = title.trim();
    const trimmedBrand = brand.trim();
    const trimmedPrice = price.trim();

    if (!trimmedTitle || !trimmedBrand || !trimmedPrice) {
      Alert.alert("Please fill in all the fields");
      return;
    }

    if (trimmedTitle.length < 4) {
      Alert.alert(
        "Name is too short",
        "The title must at least have 4 characters."
      );
      return;
    }

    const duplicate = items.find(
      (item) => item.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (duplicate) {
      Alert.alert(
        "Item already exists",
        "An item with this name already exists."
      );
      return;
    }

    try {
      await addWishlistItem({
        title: trimmedTitle,
        brand: trimmedBrand,
        price: trimmedPrice,
        bought: false,
      });
      console.log("Item added:", {
        title: trimmedTitle,
        brand: trimmedBrand,
        price: trimmedPrice,
        bought: false,
      });

      Alert.alert("Success", "Item has been added to your wishlist!");

      setTitle("");
      setBrand("");
      setPrice("");

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "Failed to add item. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
      />
      <TextInput
        placeholder="Price in €"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Item to Wishlist" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default NewItemScreen;
