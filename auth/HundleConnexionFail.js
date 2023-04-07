import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

const NoConnection = () => {
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation();

  const getConnextion = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      state.isConnected ? navigation.navigate("Login") : null;
    });

    unsubscribe();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection</Text>
      <TouchableOpacity style={styles.button} onPress={getConnextion}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  pickButton: {
    borderRadius: 5,
    padding: 5,
  },
  text: {
    color: "grey",
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E7C802",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default NoConnection;
