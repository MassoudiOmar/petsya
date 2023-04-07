import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HardcodedPosts = ({ route }) => {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchData();
    getPost();
  }, []);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const response = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setUserId(response.data.user.id);
    } catch (error) {
      console.error(error, "lol");
    }
  };

  const getPost = () => {
    axios
      .get(`${Ip}/api/post/getPost`)
      .then((result) => {
        setPosts(result.data);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Post = ({
    post_id,
    userId,
    user_id,
    sharer_id,
    image,
    post_sharer_image,
    first_name,
    last_name,
    post_sharer_first_name,
    post_sharer_last_name,
    text,
    photo,
    time,
    like,
    navigation,
  }) => {
    console.log(like);
    const sendLike = async () => {
      axios
        .post(`${Ip}/api/notification/sendNotification/${userId}/${post_id}`)
        .then((result) => {
          getPost();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const sharePost = () => {
      axios
        .post(`${Ip}/api/post/sharePost/${post_id}/${userId}`)
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <View style={styles.container}>
        {post_sharer_first_name ? (
          <View style={styles.userInfoContainer}>
            <Image
              source={{ uri: post_sharer_image.uri }}
              style={styles.sharerimage}
            />
            <Text style={styles.sharerName}>
              {post_sharer_first_name} {post_sharer_last_name}
            </Text>
          </View>
        ) : null}

        {post_sharer_first_name ? (
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: image.uri }} style={styles.userImage} />
            <View>
              <Text style={styles.username}>
                {first_name} {last_name}
              </Text>
              <Text style={styles.postTime}>{time}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.userInfoContainer}>
            <Image source={{ uri: image.uri }} style={styles.profileImage} />
            <View>
              <Text style={styles.username}>
                {first_name} {last_name}
              </Text>
              <Text style={styles.postTime}>{time}</Text>
            </View>
          </View>
        )}
        <Text style={styles.content}>{text}</Text>
        {photo ? <Image source={photo.uri} style={styles.postPhoto} /> : null}

        <View style={styles.postActions}>
          {like === user_id ? (
            <TouchableOpacity style={styles.actionButton} onPress={sendLike}>
              <MaterialIcons name="thumb-up-alt" size={20} color="blue" />
              <Text style={styles.actionButtonText}>Like</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.actionButton} onPress={sendLike}>
              <MaterialIcons name="thumb-up-off-alt" size={20} color="#333" />
              <Text style={styles.actionButtonText}>Like</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("OnePost", {
                id: post_id,
                userId: userId,
              })
            }
          >
            <Feather name="message-circle" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={sharePost}>
            <Feather name="repeat" size={20} color="#333" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#E7C802"]}
          onRefresh={getPost}
        />
      }
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        item.post_attachment ? (
          <Post
            post_id={item.id}
            user_id={item.owner_id}
            sharer_id={item.sharer_id}
            image={{ uri: item.post_owner_image }}
            post_sharer_image={{ uri: item.post_sharer_image }}
            first_name={item.post_owner_first_name}
            post_sharer_first_name={item.post_sharer_first_name}
            last_name={item.post_owner_last_name}
            post_sharer_last_name={item.post_sharer_last_name}
            text={item.post_content}
            like={item.user_make_like}
            photo={{ uri: item.post_attachment }}
            time="4 hours ago"
            navigation={navigation}
            userId={userId}
          />
        ) : (
          <Post
            post_id={item.id}
            user_id={item.owner_id}
            sharer_id={item.sharer_id}
            image={{ uri: item.post_owner_image }}
            post_sharer_image={{ uri: item.post_sharer_image }}
            first_name={item.post_owner_first_name}
            post_sharer_first_name={item.post_sharer_first_name}
            last_name={item.post_owner_last_name}
            post_sharer_last_name={item.post_sharer_last_name}
            text={item.post_content}
            time="4 hours ago"
            like={item.user_make_like}
            navigation={navigation}
            userId={userId}
          />
        )
      }
      ListHeaderComponent={<PostComponent />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  postContainer: {
    width: "100%", // Change the width to 90% of the container
    backgroundColor: "#fff",
    borderRadius: 2,
    padding: 15,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10, // increase the horizontal margin to add space between buttons
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
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sharerimage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sharerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  attachmentImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default HardcodedPosts;
