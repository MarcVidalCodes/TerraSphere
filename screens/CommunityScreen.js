import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EventScreen = () => {
  const [visibleEvents, setVisibleEvents] = useState(2); // Number of events to show initially
  const [city, setCity] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const events = [
    {
      id: "1",
      title: "River and Side Walk Cleanup",
      description: "Clean up our beautiful area and make a positive impact on our environment! ",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.toronto.ca/explore-enjoy/festivals-events/festivals-events-calendar/?start=2024-08-03T04%3A00%3A00.000Z&end=2025-08-04T03%3A59%3A59.999Z&search=clean&categories=&themes=&free=false&accessible=false&ongoing=false&view=fecList&id=NzhsJnuowh3sTycDi6rhvQ&oindex=1',
      location: "705 Progress Avenue",
      date: "August 3, 2024: 1pm - 2:30pm",
      company: "City of Toronto",
    },
    {
      id: "2",
      title: "Bayview Village Park Mulching",
      description: "Enhance the natural habitat in this peaceful park by mulching young native trees and shrubs.",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.toronto.ca/community-people/get-involved/volunteer-with-the-city/tree-planting-stewardship/tree-planting-stewardship-events-calendar/?id=80_y%24B5LHKnqY%24fLuL3Z%24g',
      location: "Bayview Village Park",
      date: "August 7, 2024: 9am - 11am",
      company: "City of Toronto",
    },
    {
      id: "3",
      title: "Broadacres Park Mulching",
      description: "Support local wildlife and mulch the growing forest at Broadacres Park.",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.toronto.ca/community-people/get-involved/volunteer-with-the-city/tree-planting-stewardship/tree-planting-stewardship-events-calendar/?start=2024-08-03T04%3A00%3A00.000Z&end=2025-08-04T03%3A59%3A59.999Z&search=&categories=&themes=&free=false&accessible=false&ongoing=false&view=fecList&id=l2YowPtX%24S9pXTvpL7Z29g&oindex=',
      location: "Toronto Beach",
      date: "August 11, 2024: 9am - 11am",
      company: "City of Toronto",
    },
    {
      id: "4",
      title: "Humber River Fall Cleanup",
      description: "Join us in making a difference with the Humber River Fall Cleanup!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.torontoadventures.ca/all-adventures/spring-fall-cleanups/',
      location: "Humber River",
      date: "October 20th 2024",
      company: "Toronto Adventures",
    },
    {
      id: "5",
      title: "Moss Park Community Clean Up",
      description: "Join the Toronto Police Service for a community clean up in Moss Park!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.dontmesswiththedon.ca/clean-ups',
      location: "Ontario Street Parkette, Moss Park",
      date: "August 18, 2024",
      company: "Don't Mess With The Don",
    },
    {
      id: "6",
      title: "Toronto's next annual spring cleanup",
      description: "Join us in cleaning up the city of Toronto!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.toronto.ca/explore-enjoy/festivals-events/clean-toronto-together/',
      location: "Toronto, ON",
      date: "April 25, 2025",
      company: "City of Toronto",
    },
    {
      id: "7",
      title: "Green Drinks Ottawa",
      description: "An open invitation to anyone studying, working on, or just interested in all things sustainable and environmental!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.greendrinks.org/ON/Ottawa',
      location: "207 Bell St, Ottawa, Ontario",
      date: "August 8, 2024",
      company: "Ottawa Green Drinks",
    },
    {
      id: "8",
      title: "Ottawa-Gatineau Climate March",
      description: "March and rally at several locations in the Ottawa-Gatineau area!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://www.toronto.ca/explore-enjoy/festivals-events/clean-toronto-together/',
      location: "110 Laurier Ave W, Ottawa, ON",
      date: "Sep 21, 2024",
      company: "Ecology Ottawa",
    },
    {
      id: "9",
      title: "McKellar Park Community Association Fall Festival",
      description: "Join us at our annual Fall Festival for a fun-packed day!",
      imageUrl: 'https://via.placeholder.com/150',
      eventUrl: 'https://mckellarparkcommunity.wordpress.com/tag/fall-festival/',
      location: "539 Wavell Ave, Ottawa, ON",
      date: "Sep 22, 2024",
      company: "Ecology Ottawa",
    },
  ];

  const handleSearch = () => {
    if (city.toLowerCase() === 'toronto') {
      const filtered = events.filter(event => event.id >= "1" && event.id <= "6");
      setFilteredEvents(filtered);
    } else if (city.toLowerCase() === 'ottawa') {
      const filtered = events.filter(event => event.id >= "7" && event.id <= "9");
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]); // No events for other cities
    }
    setVisibleEvents(2); // Reset to show only 2 events initially
  };

  const handleLoadMore = () => {
    setVisibleEvents(prev => prev + 2); // Show 2 more events
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredEvents.slice(0, visibleEvents).map(event => (
          <View key={event.id} style={styles.card}>
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.image}
            />
            <Text style={styles.itemTitle}>{event.title}</Text>
            <Text style={styles.itemDescription}>{event.description}</Text>
            <Text style={styles.itemDetail}><Text style={styles.boldText}>Location:</Text> {event.location}</Text>
            <Text style={styles.itemDetail}><Text style={styles.boldText}>Date:</Text> {event.date}</Text>
            <Text style={styles.itemDetail}><Text style={styles.boldText}>Company:</Text> {event.company}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(event.eventUrl)}>
              <Text style={styles.link}>More Info</Text>
            </TouchableOpacity>
          </View>
        ))}
        {visibleEvents < filteredEvents.length && (
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
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
  itemDetail: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  link: {
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  noEventsText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
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
