import React, { useState } from 'react';
import { View, SafeAreaView, Image, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, selectOrigin } from '../slices/navSlice';
import { GOOGLE_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LocationFav from '../components/LocationFav';

const PlanterLocationScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    const [inputFilled, setInputFilled] = useState(false);

    const handleDestination = (placeType, keyword) => {
        if (!origin || !origin.location) {
            Alert.alert("Error", "Origin is not set or invalid");
            return;
        }

        const { lat, lng } = origin.location;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=6000&type=${placeType}&keyword=${keyword}&key=${GOOGLE_API_KEY}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 'OK') {
                    Alert.alert("Error", `Google Places API error: ${data.status}`);
                    return;
                }

                if (data.results.length === 0) {
                    Alert.alert("No results found", `No ${keyword} found near the specified location.`);
                    return;
                }

                // Find the most relevant result
                const relevantResult = data.results.find(result => result.types.includes(placeType));
                if (!relevantResult) {
                    Alert.alert("No relevant results found", `No relevant ${keyword} found near the specified location.`);
                    return;
                }

                const destination = relevantResult.geometry.location;
                dispatch(setDestination({
                    location: destination,
                    description: relevantResult.name,
                }));
                navigation.navigate('MapScreen');
            })
            .catch(error => {
                Alert.alert("Error", "An error occurred while fetching the data.");
            });
    };

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
                    source={require('../assets/logo.png')}
                />
                <Text style={styles.label}>Where are you located:</Text>
                <GooglePlacesAutocomplete
                    placeholder='Where From?'
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data, details = null) => {
                        console.log("Data: ", data);
                        console.log("Details: ", details);
                        if (!details || !details.geometry) {
                            return;
                        }
                        const location = details.geometry.location;
                        dispatch(
                            setOrigin({
                                location: location,
                                description: data.description,
                            })
                        );
                        setInputFilled(true);
                        console.log("Origin set:", location);
                    }}
                    onFail={(error) => {
                        console.error("GooglePlacesAutocomplete error: ", error);
                        dispatch(setOrigin(null));
                        setInputFilled(false);
                        console.log("Failed to set origin");
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    styles={{
                        container: {
                            backgroundColor: "white",
                            paddingTop: 20,
                            flex: 0,
                        },
                        textInput: {
                            backgroundColor: "#DDDDDF",
                            borderRadius: 0,
                            fontSize: 18,
                        },
                        textInputContainer: {
                            borderRadius: 0,
                            fontSize: 18,
                            paddingHorizontal: 20,
                            borderRadius: 0,
                        },
                    }}
                    onClear={() => {
                        dispatch(setOrigin(null));
                        setInputFilled(false);
                        console.log("Origin cleared");
                    }}
                />
                <View style={styles.separator} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, !inputFilled && styles.buttonDisabled]}
                        onPress={() => inputFilled && handleDestination('park', 'park')}
                        disabled={!inputFilled}
                    >
                        <Text style={styles.buttonText}>Plant Stuff!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <LocationFav />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
});

export default PlanterLocationScreen;
