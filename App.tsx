// App.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "react-native";

import StackNavigator from "./navigation/StackNavigator";
import { WishlistProvider } from "./context/WishlistContext";

// ❱❱  voorkom dat de splash meteen verdwijnt
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 1️⃣  Fonts inladen
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  // 2️⃣  Tot fonts klaar zijn -> splash
  React.useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // 3️⃣  Globale override: alle <Text> → Montserrat
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: "Montserrat" };

  // 4️⃣  (optioneel) Montserrat ook in Navigation‑theme
  const navTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, text: "#000" },
    // React Navigation gebruikt zelf de fontFamily uit Text.defaultProps,
    // dus verder niets nodig – tenzij je eigen headerTitleStyle wilt:
    // headerTitleStyle: { fontFamily: "Montserrat-Bold" },
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
