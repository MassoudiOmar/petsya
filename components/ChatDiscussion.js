import React, { useState, useEffect,useMemo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
const socket = io("https://petsya-back-production.up.railway.app"); // replace with your server URL

const ChatDiscussion = ({ route }) => {
  const reciever_id = route.params;
  const [message, setMessage] = useState("");
  const [Discussion, setDiscussion] = useState("");
  const [userId, setUserId] = useState("");
  const [ConversationId, setConversationId] = useState("");

  ///////

  socket.off(userId).on(userId, (message) => {
    axios
      .get(`${Ip}/api/chat/getMessage/${ConversationId}`)
      .then(async (result) => {
        setDiscussion(result.data);
      })
      .catch((err) => {
        console.log(err, "erir");
      });
  });

  ///////

  useEffect(() => {
    makeConversation();
  }, []);

  const makeConversation = async () => {
    const token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const response = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setUserId(response.data.user.id);
      axios
        .post(
          `${Ip}/api/chat/makeConversation/${response.data.user.id}/${reciever_id}`
        )
        .then(async (result) => {
          setConversationId(result.data[0].convertSation_id);
          axios
            .get(`${Ip}/api/chat/getMessage/${result.data[0].convertSation_id}`)
            .then(async (result) => {
              setDiscussion(result.data);
            })
            .catch((err) => {
              console.log(err,'err');
            });
        })
        .catch((err) => {
          console.log(err,'errr');
        });
    } catch (error) {
      console.error(error, "lol");
    }
  };

  const handleSend = async () => {
    axios
      .post(`${Ip}/api/chat/makeConversation/${userId}/${reciever_id}`)
      .then((result) => {
        const data = {
          sender_id: userId,
          reciever_id: reciever_id,
          message: message,
          convertSation_id: result.data[0].convertSation_id,
        };
        axios
          .post(`${Ip}/api/chat/sendMessage`, data)
          .then((result) => {
            refreshdata();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshdata = () => {
    setMessage("");
    makeConversation();
  };

  const MessageItem = ({ item, userId }) => {
    const align = useMemo(() => item.sender_id !== userId ? "flex-start" : "flex-end", [item.sender_id, userId]);
    const color = useMemo(() => item.sender_id !== userId ? "#A0A2B1" : "black", [item.sender_id, userId]);
    const textColor = useMemo(() => item.sender_id !== userId ? "white" : "white", [item.sender_id, userId]);
  
    return (
      <View
        key={item.message_id}
        style={[styles.messageContainer, { alignSelf: align }]}
      >
        <View style={{ ...styles.messageBubble, backgroundColor: color }}>
          {item.message && item.message.trim() !== "" &&  (
            <Text style={{ ...styles.messageText, color: textColor }}>
              {item.message}
            </Text>
          )}
        </View>
        <Image style={styles.userImage} source={{ uri: item.image }} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Discussion}
        renderItem={({ item, index }) => (
          <MessageItem item={item} userId={userId} />
        )}
        keyExtractor={(item) => item.message_id}
        contentContainerStyle={styles.messagesContainer}
        inverted // to display messages from bottom to top
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#999",
    fontSize: 12,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});

export default ChatDiscussion;
