import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import io from "socket.io-client";
const socket = io("https://petsya-back-production.up.railway.app"); // replace with your server URL

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token, "token");
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const NotificationsComponent = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, "res");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const [notifications, setNotifications] = useState([]);
  const [userId,setUserId] =useState()
  const navigation = useNavigation();

  useEffect(() => {
    getNotification();
  }, []);

  let getNotification = async () => {
    const token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const response = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setUserId(response.data.user.id)
      axios
        .get(`${Ip}/api/notification/getNotification/${response.data.user.id}`)
        .then((result) => {
          setNotifications(result.data);
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error, "lol");
    }
  };

  notifications.map((e, i) => {
    socket.off(e.post_id).on(e.post_id, async () => {
      
      const message = {
          to: expoPushToken,
          sound: "default",
          title: "petsya notification",
          body: `${e.first_name} ${e.last_name} liked you post!`,
          data: { someData: "goes here" },
        };
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
        console.log('rrr')
        getNotification();
    });
  },[0]);

  return (
    <FlatList
    refreshControl={
      <RefreshControl refreshing={refreshing}   colors={['#E7C802']} onRefresh={getNotification} />
    }
    data={notifications}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.notification}
        onPress={() =>
          navigation.navigate("OnePost", {
            id: item.post_id,
            userId: userId,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>
            {item.first_name} {item.last_name}{" "}
            <Text style={styles.action}>{item.action} your post</Text>
          </Text>
  
          <Text style={styles.time}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
  
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
    marginTop: 5,
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
