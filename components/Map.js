import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInformation, setFavourites } from '../slices/navSlice';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [isFavourited, setIsFavourited] = useState(false);

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    const recenterMap = () => {
        if (origin && destination) {
            mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
        } else if (origin) {
            mapRef.current.fitToSuppliedMarkers(['origin'], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            });
        }
    };

    useEffect(() => {
        const getTravelTime = async () => {
            if (!origin || !destination) return;

            try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_API_KEY}`);
                const data = await response.json();

                if (data.status !== 'OK') {
                    Alert.alert("Error", `Google Places API error: ${data.status}`);
                    console.error("API Response Status:", data.status);
                    return;
                }

                const travelTime = data.rows[0].elements[0];
                if (travelTime.status === "NOT_FOUND") {
                    Alert.alert("Error", "Route not found between the selected locations.");
                } else {
                    console.log("Travel Time:", travelTime.duration.text);
                    dispatch(setTravelTimeInformation(travelTime));
                }
            } catch (error) {
                console.error("Error fetching travel time:", error);
                Alert.alert("Error", "An error occurred while fetching the travel time.");
            }
        };

        getTravelTime();
    }, [origin, destination, dispatch]);

    const handleFavourite = () => {
        setIsFavourited(!isFavourited);
        if (destination) {
            // Update favourites in the Redux store
            const updatedFavourites = isFavourited 
                ? [] // Remove from favourites (adjust logic as needed)
                : [destination]; // Add to favourites (adjust logic as needed)
            dispatch(setFavourites(updatedFavourites));
        }
    };

    return (
        <View style={tw`flex-1`}>
            <MapView
                ref={mapRef}
                style={tw`flex-1`}
                mapType="mutedStandard"
                initialRegion={
                    origin?.location ? {
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    } : {
                        latitude: 37.78825, // Fallback to a default location
                        longitude: -122.4324,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }
                }
            >
                {origin && destination && (
                    <MapViewDirections
                        origin={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        destination={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={3}
                        strokeColor="black"
                        onError={(errorMessage) => {
                            console.log("MapViewDirections Error:", errorMessage);
                            Alert.alert("Error", "Failed to get directions");
                        }}
                    />
                )}
                {origin?.location && (
                    <Marker
                        coordinate={{
                            latitude: origin.location.lat,
                            longitude: origin.location.lng,
                        }}
                        title="Origin"
                        description={origin.description}
                        identifier="origin"
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>{origin.description}</Text>
                        </View>
                    </Marker>
                )}
                {destination?.location && (
                    <Marker
                        coordinate={{
                            latitude: destination.location.lat,
                            longitude: destination.location.lng,
                        }}
                        title="Destination"
                        description={destination.description}
                        identifier="destination"
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>{destination.description}</Text>
                        </View>
                    </Marker>
                )}
            </MapView>
            <TouchableOpacity
                style={[styles.button, styles.recenterButton]}
                onPress={recenterMap}
            >
                <Icon name="my-location" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.favouriteButton]}
                onPress={handleFavourite}
            >
                <Icon
                    name="star"
                    type="antdesign"
                    color={isFavourited ?  '#81A263' : "white"}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`absolute top-15 left-8 bg-white p-3 rounded-full shadow-lg`}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    recenterButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    favouriteButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        backgroundColor: '#365E32',
    },
    marker: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
    },
    markerText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});
