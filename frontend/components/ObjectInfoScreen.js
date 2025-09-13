import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import objectApi from '../api/objectApi';
import VoiceButton from './VoiceButton';

export default function ObjectInfoScreen({ route, navigation }) {
  const { photoUri, imageBase64 } = route.params; // receive from CameraScreen
  const [objectInfo, setObjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    setError(false);
    try {
      let info = null;
      if (imageBase64) {
        console.log('Fetching object info from API...');
        info = await objectApi.getObjectInfo(imageBase64);
      } else if (photoUri) {
        info = { name: 'Captured Object', science: '-', history: '-', math: '-', description: 'No description available.' };
      }
      setObjectInfo(info);
    } catch (err) {
      console.error('Error fetching object info:', err);
      setError(true);
      setObjectInfo({ name: 'Unknown Object', science: '-', history: '-', math: '-', description: 'No description available.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [imageBase64, photoUri]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading object info...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ marginBottom: 10, fontSize: 16, textAlign: 'center' }}>
          Failed to fetch object info. Check your network or backend.
        </Text>
        <Button title="Retry" onPress={fetchInfo} />
      </View>
    );
  }

  const allText = `${objectInfo.name}. Science: ${objectInfo.science}. History: ${objectInfo.history}. Math: ${objectInfo.math}.`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display captured photo if available */}
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="contain" />}

      {/* Display logo at the top */}
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>{objectInfo.name}</Text>
      <Text>Science: {objectInfo.science}</Text>
      <Text>History: {objectInfo.history}</Text>
      <Text>Math: {objectInfo.math}</Text>
      <Text>Description: {objectInfo.description}</Text>

      <VoiceButton text={allText} />

      <Button
        title="Take Quiz"
        onPress={async () => {
          try {
            const quizData = await objectApi.getQuiz(objectInfo.name);
            navigation.navigate('QuizScreen', { quizData });
          } catch (err) {
            Alert.alert('Error', 'Failed to fetch quiz. Please try again.');
            console.error('Error fetching quiz:', err);
          }
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  photo: { width: '100%', height: 200, marginBottom: 15 },
});
