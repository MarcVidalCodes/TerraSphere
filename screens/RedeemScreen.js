import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RedeemScreen = () => {
  const studyPoints = 120;

  const data = [
    {
      id: "1",
      title: "Prize 1",
      description: "You won!",
      pointsCost: 100,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: "2",
      title: "Prize 2",
      description: "You Won!",
      pointsCost: 200,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Points: {studyPoints}</Text>
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
            <TouchableOpacity style={styles.button}>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#473E69',
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 80,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#473E69',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 4,
  },
  pointsCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RedeemScreen;