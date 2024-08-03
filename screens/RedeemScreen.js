import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGreenPoints, decrementGreenPoints } from '../lib/utils'; // Adjust the import path as necessary

const RedeemScreen = () => {
  const [greenPoints, setGreenPoints] = useState(getGreenPoints());
  const [redeemable, setRedeemable] = useState({});
  const [redeemed, setRedeemed] = useState({});

  const data = [
    {
      id: "1",
      title: "Gift Card",
      description: "$10 Amazon Gift Card!",
      pointsCost: 100,
      imageUrl: 'https://via.placeholder.com/150',
      key: 'giftCard',
    },
    {
      id: "2",
      title: "Gift Card",
      description: "$20 Staples Gift Card",
      pointsCost: 250,
      imageUrl: 'https://via.placeholder.com/150',
      key: 'giftCard2',
    },
    {
      id: "3",
      title: "Laptop",
      description: "ChromeBook Laptop!",
      pointsCost: 60000,
      imageUrl: 'https://via.placeholder.com/150',
      key: 'laptop',
    },
    {
      id: "4",
      title: "Scholarship",
      description: "$500 in scholarship money to any accredited Canadian University",
      pointsCost: 100000,
      imageUrl: 'https://via.placeholder.com/150',
      key: 'scholarship',
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
              source={{ uri: item.imageUrl }}
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
