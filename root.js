import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Component
import HomeScreen from "./components/HomeScreen";
import Chat from "./components/Chat";
import NotificationsComponent from "./components/NotificationsComponent";
import ChatDiscussion from "./components/ChatDiscussion";
import UserProfile from "./components/UserProfile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AddPost from "./components/AddPost";
import OnePost from "./components/onePost.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-chatbubbles-outline"
              color={color}
              size={size}
            />
          ),
          headerLeft: null,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-notifications-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Main"
        options={{ headerShown: false, headerLeft: null }}
        component={App}
      />
      <Stack.Screen name="ChatDiscussion" component={ChatDiscussion} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="OnePost" component={OnePost} />
      
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={Signup}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
