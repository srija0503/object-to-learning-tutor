import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import objectApi from '../api/objectApi';
import VoiceButton from './VoiceButton';

export default function ObjectInfoScreen({ route, navigation }) {
  const { image } = route.params;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await objectApi.getObjectInfo(image);
      setInfo(result);
    }
    fetchData();
  }, []);

  if (!info) return <ActivityIndicator size="large" />;

  const allText = `${info.name}. Science: ${info.science}. History: ${info.history}. Math: ${info.math}.`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{info.name}</Text>
      <Text>Science: {info.science}</Text>
      <Text>History: {info.history}</Text>
      <Text>Math: {info.math}</Text>
      <VoiceButton text={allText} />
      <Button title="Take Quiz" onPress={() => navigation.navigate('Quiz', { object: info.name })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});