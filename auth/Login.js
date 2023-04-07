import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";
import NetInfo from "@react-native-community/netinfo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const unsubscribe = NetInfo.addEventListener((state) => {
    state.isConnected ? null : navigation.navigate("NoConnection");
  });

  unsubscribe();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var token = await AsyncStorage.getItem("UsertokenInfo");
    if (token) {
      try {
        const result = await axios.get(`${Ip}/api/users/userInfo`, {
          headers: { token: token },
        });
        setEmail(result.data.user.email);
      } catch (error) {
        console.error(error, "lol");
      }
    }
  };
  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${Ip}/api/users/login`, data)
      .then((result) => {
        console.log(result.data);
        result.data.message == "login succssefull"
          ? handleSuccess(result.data.message, result.data.UsertokenInfo)
          : handleFailed(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSuccess = (message, token) => {
    token ? AsyncStorage.setItem("UsertokenInfo", token) : null;
    navigation.navigate("Main");
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };
  const handleFailed = (message) => {
    console.log(message);
    setMessage(message);
    setAlert(true); // set Alert to true to show the error message
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.createAccountContainer}
        >
          <Text style={styles.createAccountText}>
            Don't have an account?{" "}
            <Text style={styles.createAccountLink}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={Alert}
        showProgress={false}
        message={message}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E7C802",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  formContainer: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: 250,
  },
  button: {
    backgroundColor: "#E7C802",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  createAccountText: {
    marginTop: 20,
    color: "#2c3e50",
    textDecorationLine: "underline",
    marginLeft: 15,
  },
  alert: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default Login;
