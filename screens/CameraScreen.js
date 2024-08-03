import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';  // Import the new CircleButton component
import { saveImage, checkGptResponse } from '../lib/utils'; // Import saveImage function from utils
import { processImage } from '../lib/openai'; // Import the processImage function

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [loading, setLoading] = useState(false); // Add loading state
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSaveImage = async () => {
    if (image) {
      try {
        setLoading(true); // Set loading to true
        const base64Image = await saveImage(image);
        if (base64Image) {
          const gptResponse = await processImage(base64Image); // Process the image and get the response
          const description = checkGptResponse(gptResponse); // Check the response for a description
          Alert.alert('Your Green Thumb', description);
        }
        setImage(null);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Set loading to false
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.controlRow}>
            <Button
              icon={'flash'}
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
            <Button
              icon={'retweet'}
              onPress={() => {
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}
            />
          </View>
          <CircleButton onPress={takePicture} />
        </Camera>
      ) : (
        <>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
        </>
      )}
      <View>
        {image ? (
          <View style={styles.saveRetakeRow}>
            <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)} />
            <Button title={"Submit"} icon="check" onPress={handleSaveImage} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  controlRow: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
  },
  saveRetakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Adds a semi-transparent background
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
});

export default CameraScreen;