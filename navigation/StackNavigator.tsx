import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import TabNavigator from "./TabNavigator";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import Header from "../components/Header";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuthUser } from "../context/AuthUserContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const user = useAuthUser(); // ✅ check login status

  return (
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
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
