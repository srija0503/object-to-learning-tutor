import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraScreen from './components/CameraScreen';
import InfoScreen from './components/ObjectInfoScreen';
import QuizScreen from './components/QuizScreen';
import VoiceButton from './components/VoiceButton';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Screen</Text>

      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <View style={{ height: 10 }} />
      <Button
        title="Demo Info Screen"
        onPress={() => navigation.navigate('ObjectInfoScreen', { photoUri: null, imageBase64: null })}
      />
      <View style={{ height: 10 }} />
      <Button
        title="Demo Quiz Screen"
        onPress={() => navigation.navigate('QuizScreen', { quizData: { questions: [] } })}
      />
      <View style={{ height: 20 }} />
      <VoiceButton text="Welcome to the Object to Learning Tutor app!" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ObjectInfoScreen" component={InfoScreen} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

