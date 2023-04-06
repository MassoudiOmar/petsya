import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import PostComponent from './PostComponent';
import HardcodedPosts from "./HardcodedPosts"


// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications


export default function App() {

  return (
    <View>
<HardcodedPosts/>
    </View>
  );
}
