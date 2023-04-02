import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const PostComponent = ({}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://wallpaper.dog/large/20462815.jpg" }}
        style={styles.image}
      />
      <TextInput style={styles.input} placeholder="Write a new post..." />
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Chat')}>
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
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
    backgroundColor: "#BD93D3",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText:{
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default PostComponent;
