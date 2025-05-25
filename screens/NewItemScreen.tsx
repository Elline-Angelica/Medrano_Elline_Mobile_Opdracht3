import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/wishlistSlice";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/store";
import { addWishlistItem } from "../firebaseService";
import { auth } from "../firebaseConfig"; // ⬅️ was nog niet geïmporteerd

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

    const newItem = {
      id: uuidv4(),
      title: trimmedTitle,
      brand: trimmedBrand,
      price: trimmedPrice,
      bought: false,
    };

    //lokaal in Redux voor anonieme gebruikers
    dispatch(addItem(newItem));

    try {
      await addWishlistItem(newItem);
      console.log("Item added to Firestore:", newItem);
    } catch (error) {
      console.error("Error adding item to Firestore:", error);
      Alert.alert("Error", "Failed to sync item to cloud.");
    }

    Alert.alert("Success", "Item has been added to your wishlist!");

    // Clear form
    setTitle("");
    setBrand("");
    setPrice("");

    setTimeout(() => {
      navigation.goBack();
    }, 500);
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
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Item to Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ece4dc" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ede4db",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7b299",
    marginBottom: 10,
  },
  buttonText: {
    color: "#c7b299",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewItemScreen;
