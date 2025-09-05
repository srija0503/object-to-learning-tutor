import React from 'react';
import { Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function VoiceButton({ text }) {
  const speak = () => {
    Speech.speak(text);
  };
  return <Button title="Play Voice Explanation" onPress={speak} />;
}