import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const StatsBar = () => {
  // Static data for front-end-only version
  const data = [
    {
      id: "1",
      title: "Study Points",
      value: "150", // Static study points
      icon: "trophy",
      iconType: "ionicon",
    },
    {
      id: "2",
      title: "Point Multiplier",
      value: "x1.50", // Static multiplier
      icon: "star",
      iconType: "ionicon",
    },
    {
      id: "3",
      title: "Current Streak",
      value: "5", // Static streak
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
