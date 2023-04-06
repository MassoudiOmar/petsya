import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MyComponent = () => {
  const [paragraph, setParagraph] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [userId, setUserId] = useState("");
  const [imageuser, setImageuser] = useState("");
  const [firstname, setFisrt_name] = useState("");
  const [lastname, setLast_name] = useState("");
  const navigation = useNavigation();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // set base64 option to true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(result.assets[0].base64);
    }
  };

  const handlePost = async () => {
    const data = {
      content: paragraph,
      attachment: base64 ? base64 : null,
    };
    axios
      .post(`${Ip}/api/post/addPost/${userId}`, data)
      .then(async (result) => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    var token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const result = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setUserId(result.data.user.id);
      setImageuser(result.data.user.image);
      setFisrt_name(result.data.user.first_name);
      setLast_name(result.data.user.last_name);
    } catch (error) {
      console.error(error, "lol");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={imageuser ? { uri: imageuser } : null}
          style={styles.userImage}
        />

        <Text style={styles.username}>
          {" "}
          {firstname} {lastname}
        </Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Write something..."
          value={paragraph}
          onChangeText={(text) => setParagraph(text)}
        />
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <AntDesign name="folderopen" size={24} color="white" />
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  body: {
    flex: 1,
    padding: 10,
    position: "relative",
  },
  input: {
    height: "20%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pickButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
  },
  imagePreview: {
    height: "50%",
    resizeMode: "contain",
    marginTop: 10,
  },
  postButton: {
    backgroundColor: "blue",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    borderRadius: 15,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyComponent;
