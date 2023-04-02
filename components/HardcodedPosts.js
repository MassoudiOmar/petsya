import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PostComponent from "./PostComponent";

const Post = ({ image, username, text, photo, time }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={image} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>{username}</Text>
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

const HardcodedPosts = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <PostComponent />

      <Post
        image={require("../assets/icon.png")}
        username="John Smith"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        time="2 hours ago"
      />
      <Post
        image={require("../assets/icon.png")}
        username="Jane Doe"
        text="Nullam eget bibendum orci, sed lobortis velit."
        photo={require("../assets/adaptive-icon.png")}
        time="4 hours ago"
      />
      <Post
        image={require("../assets/icon.png")}
        username="Alex Johnson"
        text="Vestibulum vitae malesuada dolor, ac suscipit orci."
        time="6 hours ago"
      />
      <Post
        image={require("../assets/icon.png")}
        username="Sarah Davis"
        text="Suspendisse sed neque nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        photo={require("../assets/dogs.jpg")}
        time="8 hours ago"
      />
      <Post
        image={require("../assets/icon.png")}
        username="Mike Wilson"
        text="Curabitur tempor libero a erat iaculis, eu congue ipsum molestie."
        time="10 hours ago"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 1,
    paddingBottom: 10,
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

export default HardcodedPosts;
