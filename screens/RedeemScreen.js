import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGreenPoints, decrementGreenPoints } from '../lib/utils'; // Adjust the import path as necessary

// Import images
import rbImage from '../assets/rb.png';
import flowerImage from '../assets/flower.png';
import passImage from '../assets/pass.png';
import backpackImage from '../assets/backpack.png';
import susImage from '../assets/sus.png';

const RedeemScreen = () => {
  const [greenPoints, setGreenPoints] = useState(getGreenPoints());
  const [redeemable, setRedeemable] = useState({});
  const [redeemed, setRedeemed] = useState({});

  const data = [
    {
      id: "1",
      title: "Ray-Ban Discount",
      description: "10% off on Ray-Ban sunglasses",
      pointsCost: 250,
      imageUrl: rbImage,
      key: 'rb',
    },
    {
      id: "2",
      title: "Seed Pack",
      description: "Pack of seeds to plant in your garden",
      pointsCost: 300,
      imageUrl: flowerImage,
      key: 'flower',
    },
    {
      id: "3",
      title: "Nature Park Pass",
      description: "One time park entrance to any Canadian national park",
      pointsCost: 500,
      imageUrl: passImage,
      key: 'pass',
    },
    {
      id: "4",
      title: "Sustainable Living Guide",
      description: "Guide to living a more eco-friendly lifestyle",
      pointsCost: 1000,
      imageUrl: susImage,
      key: 'sus',
    },
    {
      id: "5",
      title: "Eco-Friendly Backpack",
      description: "Stylish and sustainable backpack",
      pointsCost: 5000,
      imageUrl: backpackImage,
      key: 'backpack',
    },
  ];

  useEffect(() => {
    // Initialize redeemable and redeemed statuses
    const initialRedeemable = {};
    const initialRedeemed = {};

    data.forEach(item => {
      initialRedeemable[item.key] = greenPoints >= item.pointsCost;
      initialRedeemed[item.key] = false; // All items are initially not redeemed
    });

    setRedeemable(initialRedeemable);
    setRedeemed(initialRedeemed);
  }, [greenPoints]);

  const handleRedeem = (item) => {
    if (!redeemed[item.key]) {
      if (redeemable[item.key]) {
        decrementGreenPoints(item.pointsCost);
        setGreenPoints(getGreenPoints());
        setRedeemed(prev => ({
          ...prev,
          [item.key]: true, // Mark as redeemed
        }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Points: {greenPoints}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map(item => (
          <View key={item.id} style={styles.card}>
            <Image
              source={item.imageUrl}
              style={styles.image}
            />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.pointsCost}>Cost: {item.pointsCost} Points</Text>
            {redeemed[item.key] && <Text style={styles.notEnough}>Already redeemed</Text>}
            <TouchableOpacity 
              style={[styles.button, redeemed[item.key] && styles.disabledButton]} 
              onPress={() => handleRedeem(item)} 
              disabled={redeemed[item.key]}
            >
              <Text style={styles.buttonText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pointsContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#473E69',
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 300,
    marginVertical: 10,
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#473E69',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  pointsCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745', // Green color for points cost
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#059212', // Green button background
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Gray background when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notEnough: {
    color: 'red',
    fontSize: 14,
    marginVertical: 5,
  },
});

export default RedeemScreen;
