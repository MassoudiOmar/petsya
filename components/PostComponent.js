import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const PostComponent = ({}) => {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const response = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setImage(response.data.user.image);
      setUserData(response.data.user);
      console.log(response.data.user.image);
    } catch (error) {
      console.error(error, "lol");
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {image ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", userData)}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      ) : null}
      <TextInput style={styles.input} placeholder="Write a new post..." />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddPost")}
      >
        <Feather name="navigation" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 1,
    padding: 10,
    marginBottom: 4, // Changed from 20 to 10
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },

});

export default PostComponent;
