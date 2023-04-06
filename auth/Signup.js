import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";
import AwesomeAlert from "react-native-awesome-alerts";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleSignup = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    axios
      .post(`${Ip}/api/users/registration`, data)
      .then((result) => {
        console.log(result.data)
        result.data == "registration success"
          ? handleSuccess(result.data)
          : handleFailed(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSuccess = (message) => {
    setMessage(message);
    setAlert(true);
    navigation.navigate("Login");
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const handleFailed = (message) => {
    setMessage(message);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={styles.createAccountText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? <Text style={styles.link}>Log In</Text>
      </Text>
      <AwesomeAlert
        show={Alert}
        message={message}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E7C802',
    marginBottom: 30,
    marginRight: 155,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom:10,
    borderRadius:20,
    width:280
  },
  button: {
    backgroundColor: "#E7C802",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    width: "82%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  createAccountText: {
    marginTop: 20,
    color: "#2c3e50",
    textDecorationLine: "underline",
  },
});

export default Signup;
