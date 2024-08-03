import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';
import StatsBar from '../components/StatsBar.js';

const HomeScreen = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <Text style={styles.caption}>Saving the planet, one deed at a time</Text>
                <StatsBar />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Earn Green Points to Redeem Prizes!</Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.description}>(1 Point) Take a snap of watering a plant</Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.description}>(2 Points) Take a snap of watering a plant outdoors</Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.description}>(5 Points) Take a snap of you cleaning up trash</Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.description}>(10 Points) Take a snap of you planting a flower or a sappling</Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.title}>Longer Streak = Point Multiplier</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 320,
        height: 150,
        marginLeft: 10,
        resizeMode: "contain",
        color: "#059212",
    },
    textContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#059212',
        textAlign: 'center'
    },
    caption: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#059212',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        padding: 1,
        fontSize: 21,
        color: 'black',
    },
});

export default HomeScreen;
