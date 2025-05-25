import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

// De context bevat een User of null
const AuthUserContext = createContext<User | null>(null);

// Provider component
export const AuthUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // wacht tot Firebase auth klaar is

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // cleanup bij unmount
  }, []);

  if (loading) return null; // of eventueel een <SplashScreen />

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
};

// Custom hook om user op te vragen
export const useAuthUser = () => useContext(AuthUserContext);
