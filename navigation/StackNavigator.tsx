import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      header: ({ route, navigation, options }) => (
        <Header
          title={options.title as string}
          canGoBack={navigation.canGoBack()}
          navigation={navigation}
        />
      ),
    }}
  >
    <Stack.Screen
      name="HomeTabs"
      component={TabNavigator}
      options={{ title: "Luxury Wishlist" }}
    />
    <Stack.Screen
      name="ItemDetail"
      component={ItemDetailScreen}
      options={{ title: "Item Detail" }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
