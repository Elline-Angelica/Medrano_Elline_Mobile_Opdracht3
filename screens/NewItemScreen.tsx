import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { WishlistItem } from "../types/wishlist";
import uuid from "react-native-uuid";

const validationSchema = Yup.object({
  title: Yup.string().min(4, "Minstens 4 tekens").required("Verplicht"),
  brand: Yup.string().min(4, "Minstens 4 tekens").required("Verplicht"),
  price: Yup.string().required("Verplicht"),
});

const NewItemScreen = ({ navigation }: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Formik
          initialValues={{ title: "", brand: "", price: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            const newItem: WishlistItem = {
              id: uuid.v4().toString(),
              title: values.title,
              brand: values.brand,
              price: values.price,
              bought: false,
            };
            Alert.alert(
              "Item toegevoegd!",
              `${newItem.title} van ${newItem.brand}`
            );
            actions.resetForm();
            navigation.navigate("AllItems", { newItem }); // ← Send new item back
          }}
        >
          {(props) => (
            <View>
              <TextInput
                placeholder="Item naam"
                style={styles.input}
                onChangeText={props.handleChange("title")}
                onBlur={props.handleBlur("title")}
                value={props.values.title}
              />
              <Text style={styles.error}>
                {props.touched.title && props.errors.title}
              </Text>

              <TextInput
                placeholder="Merk"
                style={styles.input}
                onChangeText={props.handleChange("brand")}
                onBlur={props.handleBlur("brand")}
                value={props.values.brand}
              />
              <Text style={styles.error}>
                {props.touched.brand && props.errors.brand}
              </Text>

              <TextInput
                placeholder="Prijs"
                style={styles.input}
                onChangeText={props.handleChange("price")}
                onBlur={props.handleBlur("price")}
                value={props.values.price}
              />
              <Text style={styles.error}>
                {props.touched.price && props.errors.price}
              </Text>

              <Button title="Toevoegen" onPress={props.handleSubmit as any} />
              <Button
                title="Annuleren"
                color="grey"
                onPress={() => navigation.goBack()}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
  },
  error: { color: "red", marginBottom: 5 },
});

export default NewItemScreen;
