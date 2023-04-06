import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Post = ({
  post_id,
  user_id,
  image,
  first_name,
  last_name,
  text,
  photo,
  time,
  navigation
}) => {
  const sendLike = async() => {
    var token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const result = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      axios.post(`${Ip}/api/notification/sendNotification/${result.data.user.id}/${user_id}/${post_id}`).then((result)=>{console.log(result.data)}).catch((err)=>{console.log(err)})
    } catch (error) {
      console.error(error, "lol");
    }
  };

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
        <TouchableOpacity style={styles.actionButton} onPress={sendLike}>
          <Feather name="thumbs-up" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={20} color="#333"  onPress={()=>navigation.navigate('OnePost')}/>
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

const HardcodedPosts = ({ route }) => {
  const [posts, setPosts] = useState();
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getPost();
  }, []);

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

  return (
    <FlatList
    refreshControl={
      <RefreshControl refreshing={refreshing}   colors={['#E7C802']} onRefresh={getPost} />
    }
    data={posts}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) =>
      item.attachment ? (
        <Post
          post_id={item.id}
          user_id={item.user_id}
          image={{ uri: item.image }}
          first_name={item.first_name}
          last_name={item.last_name}
          text={item.content}
          photo={{ uri: item.attachment }}
          time="4 hours ago"
        />
      ) : (
        <Post
          post_id={item.id}
          user_id={item.user_id}
          image={{ uri: item.image }}
          first_name={item.first_name}
          last_name={item.last_name}
          text={item.content}
          time="4 hours ago"
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
    width: '100%', // Change the width to 90% of the container
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
  
});

export default HardcodedPosts;
