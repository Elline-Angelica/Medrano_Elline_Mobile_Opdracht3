import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "react-native";

import StackNavigator from "./navigation/StackNavigator";
import { WishlistProvider } from "./context/WishlistContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: "Montserrat" };

  const navTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, text: "#000" },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WishlistProvider>
        <NavigationContainer theme={navTheme}>
          <StackNavigator />
        </NavigationContainer>
      </WishlistProvider>
    </GestureHandlerRootView>
  );
}
