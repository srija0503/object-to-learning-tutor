import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const navigation = useNavigation();
  const [facing, setFacing] = useState("back"); // "back" or "front"
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  // Request permission on mount
  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        // Capture photo with base64
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7, base64: true });
        setPhotoUri(photo.uri);

        // Navigate and pass both photoUri and base64
        navigation.navigate("ObjectInfoScreen", {
          photoUri: photo.uri,
          imageBase64: photo.base64,
        });
      } catch (err) {
        console.error("Error taking photo:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}
        mode="picture"
      />
      <View style={styles.buttons}>
        <Button title="Flip Camera" onPress={toggleCameraFacing} />
        <Button title="Capture Photo" onPress={takePhoto} />
      </View>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  preview: { width: "100%", height: 200, marginTop: 10 },
});
