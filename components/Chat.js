import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const availableUsers = [
  {
    id: 1,
    name: 'Alice',
    profileImage: require('../assets/dogs.jpg'),
    lastMessage: 'Hey, how are you?',
  },
  {
    id: 2,
    name: 'Bob',
    profileImage: require('../assets/wa.png'),
    lastMessage: 'Not much, what about you?',
  },
  {
    id: 3,
    name: 'Charlie',
    profileImage: require('../assets/splash.png'),
    lastMessage: null,
  },
  {
    id: 4,
    name: 'David',
    profileImage: require('../assets/icon.png'),
    lastMessage: 'See you later!',
  },
];

const UserList = () => {
  const [searchText, setSearchText] = useState('');

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={item.profileImage} />
        <View style={styles.greenDot} />
      </View>
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        {item.lastMessage ? (
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        ) : (
          <Text style={styles.startChat}>Start chat</Text>
        )}
      </View>
    </View>
  );

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (user.lastMessage && user.lastMessage.toLowerCase().includes(searchText.toLowerCase()))
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
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        contentContainerStyle={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor:"#FFFFFF"
  },
  searchButton: {
    backgroundColor: "#BD93D3",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  greenDot: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#1DDA20',
    borderWidth: 1,
    borderColor: '#334442',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#777',
  },
  startChat: {
    fontSize: 14,
    color: '#B8B9B8',
    fontWeight: 'bold',
  },
});

export default UserList;
