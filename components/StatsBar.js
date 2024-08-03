import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { getStreak, getGreenPoints } from '../lib/utils';

const StatsBar = () => {
  const [currentStreak, setCurrentStreak] = useState(getStreak());
  const [greenPoints, setGreenPoints] = useState(getGreenPoints());
  const scoreMultiplier = 1.75; // Fixed multiplier value

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStreak(getStreak());
      setGreenPoints(getGreenPoints());
    }, 1000); // Update every second, adjust as necessary

    return () => clearInterval(interval);
  }, []);

  const data = [
    {
      id: "1",
      title: "Green Points",
      value: `${Math.round(greenPoints)}`, // Updated with green points
      icon: "trophy",
      iconType: "ionicon",
    },
    {
      id: "2",
      title: "Point Multiplier",
      value: `x${scoreMultiplier.toFixed(2)}`, // Fixed multiplier value
      icon: "star",
      iconType: "ionicon",
    },
    {
      id: "3",
      title: "Current Streak",
      value: `${currentStreak}`, // Update with the current streak
      icon: "flame",
      iconType: "ionicon",
    },
  ];

  return (
    <View style={styles.container}>
      {data.map(item => (
        <View key={item.id} style={styles.box}>
          <Icon name={item.icon} type={item.iconType} size={30} color="#fff" />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#365E32',
    padding: 10,
  },
  box: {
    backgroundColor: '#81A263',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    marginVertical: 5,
  },
  title: {
    fontSize: 14,
    color: '#fff',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default StatsBar;
