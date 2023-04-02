import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

const NotificationsComponent = () => {
  const notifications = [
    {
      id: 1,
      image: "https://wallpaper.dog/large/20462815.jpg",
      userName: "John Doe",
      action: "liked your post",
      time: "2 hours ago",
    },
    {
      id: 2,
      image: "https://wallpaper.dog/large/20462815.jpg",
      userName: "Jane Smith",
      action: "commented on your post",
      time: "5 hours ago",
    },
    {
      id: 3,
      image: "https://wallpaper.dog/large/20462815.jpg",
      userName: "Bob Johnson",
      action: "followed you",
      time: "10 hours ago",
    },
    // Add more notifications here...
  ];

  return (
    <ScrollView style={styles.container}>
      {notifications.map((notification) => (
        <View key={notification.id} style={styles.notification}>
          <Image source={{ uri: notification.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>
              {notification.userName}
                {" "}<Text style={styles.action}>{notification.action}</Text>
            </Text>

            <Text style={styles.time}>{notification.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  action: {
    color: "#8D8383",
  },
  time: {
    color: "#BBBBBB",
  },
});

export default NotificationsComponent;
