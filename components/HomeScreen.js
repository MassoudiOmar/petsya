import React from 'react';
import { View ,Button,Text} from 'react-native';
import HardcodedPosts from './HardcodedPosts';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HardcodedPosts/>
      </View>
    );
  }
  