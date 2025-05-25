import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigation = useNavigation();

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (password.length < 4) newErrors.password = "Min. 4 characters required";
    else if (!/\d/.test(password))
      newErrors.password = "Include at least one number";
    else if (!/[!@#$%^&*(),.;?":{}|<>]/.test(password))
      newErrors.password = "Include at least one symbol";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) setErrors((e) => ({ ...e, name: "" }));
        }}
        style={styles.input}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        onBlur={validate}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors((e) => ({ ...e, email: "" }));
        }}
        style={styles.input}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
        onBlur={validate}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((e) => ({ ...e, password: "" }));
          }}
          secureTextEntry={!showPassword}
          style={styles.inputNoBorder}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onBlur={validate}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggleText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors((e) => ({ ...e, confirmPassword: "" }));
          }}
          secureTextEntry={!showConfirmPassword}
          style={styles.inputNoBorder}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onBlur={validate}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.toggleText}>
            {showConfirmPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      {errors.general && (
        <Text style={[styles.errorText, { textAlign: "center" }]}>
          {errors.general}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ede4db",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#c7b299",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputNoBorder: {
    flex: 1,
    color: "#000",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  toggleText: {
    color: "#c7b299",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#ede4db",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c7b299",
    marginTop: 10,
  },
  buttonText: {
    color: "#c7b299",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterScreen;
