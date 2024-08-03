// CircleButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const CircleButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.circleButton} />
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleButton;
