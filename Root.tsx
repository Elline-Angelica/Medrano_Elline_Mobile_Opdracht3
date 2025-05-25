// Root.tsx
import React from "react";
import { useAuthUser } from "./context/AuthUserContext";
import StackNavigator from "./navigation/StackNavigator";
import LoginScreen from "./screens/LoginScreen";

const Root = () => {
  const user = useAuthUser();
  return user ? <StackNavigator /> : <LoginScreen />;
};

export default Root;
