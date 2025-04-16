import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllItemsScreen from "../screens/AllItemsScreen";
import NewItemScreen from "../screens/NewItemScreen";
import AboutScreen from "../screens/AboutScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="AllItems"
      component={AllItemsScreen}
      options={{
        title: "All Items",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="NewItem"
      component={NewItemScreen}
      options={{
        title: "Add Item",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: "About",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="information-circle" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
