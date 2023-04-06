import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import axios from "axios";
import Ip from "../IP";

const Post = ({ image, first_name, last_name, text, photo, time }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={image} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>
            {first_name} {last_name}
          </Text>
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

const OnePost = ({ route }) => {
  const { id, userId } = route.params;
  console.log(id, userId, "pd");
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    getComments();
    getPost();
  }, []);

  const handleComment = () => {
    const data = {
      comment: comment,
    };
    axios
      .post(`${Ip}/api/post/sendcomment/${id}/${userId}`, data)
      .then((result) => {
        console.log(result.data);
        setComment('')
        getComments()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = () => {
    axios
      .get(`${Ip}/api/post/getOnePost/${id}`)
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = () => {
    axios
      .get(`${Ip}/api/post/getcomments/${id}`)
      .then((result) => {
        console.log(result.data);
        setComments(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderPost = () => {
    return (
      posts &&
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
      )
    );
  };

  const renderComments = () => {
    return comments.map((comment, index) => (
      <View key={index} style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <Image source={{ uri: comment.image }} style={styles.profileImage} />
          <View>
            <Text style={styles.usernamecomment}>
              {comment.first_name} {comment.last_name}
            </Text>
            <Text style={styles.commentTime}>4 hours ago</Text>
          </View>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderPost()}
        {renderComments()}
        {/* Your OnePost component code here */}

        {/* Fixed input and button at the bottom */}
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TextInput
          style={{
            flex: 1,
            marginRight: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "gray",
            padding: 5,
          }}
          placeholder="Add a comment"
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#E7C802", borderRadius: 20, padding: 10 }}
          onPress={handleComment}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  postContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 2, // Changed from 20 to 10
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    paddingLeft: 30,
    paddingRight: 30,
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
    width: "110%",
    right: 22,
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
  commentContainer: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  usernamecomment: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
  },
  commentText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 20,
    marginLeft: 50,
  },
});

export default OnePost;
