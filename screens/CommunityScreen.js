import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventScreen = () => {
  const [visibleEvents, setVisibleEvents] = useState(2); // Number of events to show initially

  const events = [
    {
      id: "1",
      title: "Tree Planting Event",
      description: "Join us for a community tree planting event to help green our city!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event1',
    },
    {
      id: "2",
      title: "Beach Cleanup",
      description: "Help us keep our beaches clean and safe for everyone!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event2',
    },
    {
      id: "3",
      title: "Community Garden Workshop",
      description: "Learn how to grow your own food at our community garden workshop.",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event3',
    },
    {
      id: "4",
      title: "Recycling Drive",
      description: "Bring your recyclables to our community recycling drive!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event4',
    },
    {
      id: "5",
      title: "Bird Watching Tour",
      description: "Join us for a guided bird watching tour in the city park.",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event5',
    },
    {
      id: "6",
      title: "Environmental Fair",
      description: "Learn about sustainable living at our environmental fair.",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://example.com/event6',
    },
  ];

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 2); // Show 2 more events
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {events.slice(0, visibleEvents).map(event => (
          <View key={event.id} style={styles.card}>
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.image}
            />
            <Text style={styles.itemTitle}>{event.title}</Text>
            <Text style={styles.itemDescription}>{event.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(event.eventUrl)}>
              <Text style={styles.link}>More Info</Text>
            </TouchableOpacity>
          </View>
        ))}
        {visibleEvents < events.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 10,
  },
  link: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadMoreButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventScreen;