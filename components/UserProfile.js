import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import Ip from "../IP";

const UserProfile = ({ route }) => {
  const userData = route.params;
  const [posts,setPosts]=useState()
  console.log(userData, "user");
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get(`${Ip}/api/post/getPostByUserId/${userData.id}`)
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const user = {
    image: userData.image,
    fullName: userData.first_name,
    email: userData.email,
  };

  const handleChatPress = () => {
    // Handle chat button press
  };

  const Post = ({ image, first_name,last_name, text, photo, time }) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image source={image} style={styles.profileImage} />
          <View>
            <Text style={styles.username}>{first_name} {last_name}</Text>
            <Text style={styles.postTime}>{time}</Text>
          </View>
        </View>
        <Text style={styles.postText}>{text}</Text>
        {photo && <Image source={photo} style={styles.postPhoto} />}
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="thumbs-up" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="repeat" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image style={styles.userImage}   source={{ uri: user.image }}
 />
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        <View style={styles.postsContainer}>
          <Text style={styles.postsTitle}>Posts</Text>

          {posts &&
        posts.map((element, index) =>
          element.attachment ? (
            <Post
              image={{ uri: element.image }}
              first_name={element.first_name}
              last_name={element.last_name}
              text={element.content}
              photo={{ uri: element.attachment }}
              time="4 hours ago"
              key={index}
            />
          ) : (
            <Post
              image={{ uri: element.image }}
              first_name={element.first_name}
              last_name={element.last_name}
              text={element.content}
              time="4 hours ago"
              key={index}
            />
          )
        )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  chatButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  postsContainer: {
    flex: 1,
    width: "100%",
  },
  postsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  postContent: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 2, // Changed from 20 to 10
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  postTime: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  postText: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
  },
  postPhoto: {
    width: "108%",
    right: 18,
    height: 470,
    borderRadius: 5,
    marginTop: 1,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row", // added flexDirection
    alignItems: "center", // added alignItems
    marginHorizontal: 6, // added marginHorizontal
  },
  actionButtonText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5, // added marginLeft
  },
  actionButtonIcon: {
    marginRight: 5, // added marginRight
  },
});
export default UserProfile;
