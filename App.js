import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import NotificationsComponent from "./components/NotificationsComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Chat from "./components/Chat"
import MainStack from "./root";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
}
