import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getOrigin, getDestination } from '../lib/utils'; // Import helper functions

const Map = () => {
    const origin = getOrigin(); // Use helper function to get origin
    const destination = getDestination(); // Use helper function to get destination
    const mapRef = useRef(null);
    const navigation = useNavigation();

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
                const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API_KEY}`);
                const data = await response.json();
                console.log(data.rows[0].elements[0].duration.text);
            } catch (error) {
                console.error("Error fetching travel time:", error);
            }
        };
        getTravelTime();
    }, [origin, destination]);

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
                        origin={origin.description}
                        destination={destination.description}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={3}
                        strokeColor="black"
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
                style={tw`absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-lg`}
                onPress={recenterMap}
            >
                <Icon name="my-location" size={20} />
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
