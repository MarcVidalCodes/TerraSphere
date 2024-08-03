import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getGreenPoints, redeemItem } from '../lib/utils'; // Import updated functions

const RedeemScreen = () => {
  const [greenPoints, setGreenPoints] = useState(getGreenPoints()); // Initialize with current points
  const [redeemable, setRedeemable] = useState({});
  const [redeemed, setRedeemed] = useState({});

  const data = [
    {
      id: "1",
      title: "Outdoor Hat",
      description: "Stylish hat for your outdoor adventures!",
      pointsCost: 150,
      imageUrl: 'https://via.placeholder.com/150?text=Hat',
      key: 'hat',
    },
    {
      id: "2",
      title: "Ray-Ban Discount",
      description: "Get 20% off on Ray-Ban sunglasses.",
      pointsCost: 300,
      imageUrl: 'https://via.placeholder.com/150?text=Sunglasses',
      key: 'rayBanDiscount',
    },
    {
      id: "3",
      title: "Camping Gear",
      description: "High-quality camping gear set for your trips.",
      pointsCost: 600,
      imageUrl: 'https://via.placeholder.com/150?text=Camping+Gear',
      key: 'campingGear',
    },
    {
      id: "4",
      title: "National Park Pass",
      description: "Annual pass for national parks.",
      pointsCost: 1200,
      imageUrl: 'https://via.placeholder.com/150?text=Park+Pass',
      key: 'parkPass',
    },
  ];

  useEffect(() => {
    // Initialize redeemable and redeemed statuses based on current points
    const initialRedeemable = {};
    const initialRedeemed = {};

    data.forEach(item => {
      const { redeemable: isRedeemable, redeemed: isRedeemed } = redeemItem(item, greenPoints, setGreenPoints);
      initialRedeemable[item.key] = isRedeemable;
      initialRedeemed[item.key] = isRedeemed;
    });

    setRedeemable(initialRedeemable);
    setRedeemed(initialRedeemed);
  }, [greenPoints]);

  const handleRedeem = (item) => {
    const { redeemable: isRedeemable, redeemed: isRedeemed } = redeemItem(item, greenPoints, setGreenPoints);
    if (!redeemed[item.key] && isRedeemable) {
      setRedeemed(prev => ({
        ...prev,
        [item.key]: isRedeemed, // Mark as redeemed
      }));
      setRedeemable(prev => ({
        ...prev,
        [item.key]: isRedeemable, // Mark as not redeemable
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Green Points: {greenPoints}</Text>
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
    backgroundColor: '#28a745', // Green button background
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
