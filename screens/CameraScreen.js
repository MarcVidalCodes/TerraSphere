import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as FileSystem from 'expo-file-system'; // Import FileSystem
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton'; // Import the new CircleButton component
import { saveImage } from '../lib/utils'; // Import saveImage function from utils

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
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
        const base64Url = await saveImage(image); // Save image and get base64 URL
        if (base64Url) {
          Alert.alert('Your Green Thumb', base64Url); // Display base64 URL in alert
        }
        setImage(null);
      } catch (e) {
        console.log(e);
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
        <Image source={{ uri: image }} style={styles.camera} />
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
});

export default CameraScreen;
