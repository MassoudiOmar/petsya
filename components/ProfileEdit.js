import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Ip from "../IP";
import { useNavigation } from "@react-navigation/native";

const ProfileEdit = ({ route }) => {
  const userData = route.params;
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [first_name, setFirstname] = useState();
  const [last_name, setLastname] = useState();
  const [email, setEmail] = useState();
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

  const updateInformation = () => {
    const data = {
      first_name: first_name ? first_name : userData.first_name,
      last_name: last_name ? last_name : userData.last_name,
      email: email ? email : userData.email,
      image: base64 ? base64 : userData.image,
    };
    axios
      .post(`${Ip}/api/users/updateInformation/${userData.id}`, data)
      .then(() => {
       navigation.goBack()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Image
          style={styles.image}
          source={{ uri: image ? image : userData.image }}
        />
        <Text style={styles.imageText}>Update Photo</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            setFirstname(e);
          }}
          placeholder={userData.first_name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            setLastname(e);
          }}
          placeholder={userData.last_name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            setEmail(e);
          }}
          placeholder={userData.email}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateInformation}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  imageButton: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  imageText: {
    fontSize: 16,
    color: "#1e90ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileEdit;
