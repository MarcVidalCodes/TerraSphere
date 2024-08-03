import React, { useState } from 'react';
import { View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const logo = require('../assets/logo.png');

const PlanterLocationScreen = () => {
    const [inputFilled, setInputFilled] = useState(false);

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 300,
                        height: 150,
                        marginLeft: 20,
                        resizeMode: "contain",
                    }}
                    source={logo}
                />
                <Text style={styles.label}>Where are you located:</Text>
                <View style={styles.inputContainer}>
                    {/* Placeholder for GooglePlacesAutocomplete */}
                    <Text style={styles.placeholderText}>Where From?</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, !inputFilled && styles.buttonDisabled]}
                        onPress={() => { /* Button action here */ }}
                        disabled={!inputFilled}
                    >
                        <Text style={styles.buttonText}>Plant Stuff!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.favouritesContainer}>
                    {/* Placeholder for NavFavourites */}
                    <Text style={styles.placeholderText}>Favorites go here</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#DDDDDF",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    placeholderText: {
        fontSize: 18,
        color: "#A9A9A9",
    },
    buttonContainer: {
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#473E69',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        color: '#473E69',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    separator: {
        borderBottomColor: '#473E69',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    favouritesContainer: {
        padding: 10,
        backgroundColor: "#DDDDDF",
        borderRadius: 5,
    },
});

export default PlanterLocationScreen;
