import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";

const UserList = ({ route }) => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [users, setUsers] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`${Ip}/api/users/getUsers`)
      .then((result) => {
        setUsers(result.data);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatDiscussion", item.id)}
      >
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={{ uri: item.image }} />
          <View style={styles.greenDot} />
        </View>
      </TouchableOpacity>
      <View style={styles.userDetails}>
        <Text style={styles.userName}>
          {item.first_name} {item.last_name}
        </Text>
        {item.lastMessage ? (
          <Text style={styles.lastMessage}>{"item.lastMessage"}</Text>
        ) : (
          <Text style={styles.startChat}>Start chat</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
         refreshControl={
          <RefreshControl refreshing={refreshing}   colors={['#E7C802']} onRefresh={getUsers} />
        }
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        contentContainerStyle={styles.userList}
        ListFooterComponent={<Text style={styles.endText}>End of list</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  searchButton: {
    backgroundColor: "#E7C802",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  userList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  greenDot: {
    position: "absolute",
    bottom: 0,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#1DDA20",
    borderWidth: 1,
    borderColor: "#334442",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#777",
  },
  startChat: {
    fontSize: 14,
    color: "#B8B9B8",
    fontWeight: "bold",
  },
  endText: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  }
  
});

export default UserList;
