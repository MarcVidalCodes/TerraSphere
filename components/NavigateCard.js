import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GOOGLE_API_KEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, setTravelTimeInformation, setFavourites } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { selectTravelTimeInformation, selectDestination, selectOrigin, selectFavourites } from '../slices/navSlice';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const favourites = useSelector(selectFavourites);
    const [isFavourited, setIsFavourited] = useState(false);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            try {
                const encodedOrigin = encodeURIComponent(origin.description);
                const encodedDestination = encodeURIComponent(destination.description);
                const response  = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodedOrigin}&destinations=${encodedDestination}&key=${GOOGLE_API_KEY}`);

                const data = await response.json();
                if (data.rows[0].elements[0]) {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0].duration));
                } else {
                    console.error("No travel time information found in response");
                }
            } catch (error) {
                console.error("Error fetching travel time:", error);
            }
        };
        getTravelTime();
    }, [origin, destination, GOOGLE_API_KEY, dispatch]);

    const handleFavourite = () => {
        setIsFavourited(!isFavourited);
        if (destination) {
            const updatedFavourites = isFavourited 
                ? favourites.filter(fav => fav.location.lat !== destination.location.lat && fav.location.lng !== destination.location.lng)
                : [...favourites, destination];
            dispatch(setFavourites(updatedFavourites));
        }
    };

    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                {travelTimeInformation && destination ? (
                    <View style={tw`mt-2 px-5`}>
                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={[tw`text-xl font-semibold`, { textAlign: 'center' }]}>
                                Location: {destination.description}
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={[tw`text-xl font-semibold`, { textAlign: 'center' }]}>
                                Distance: {travelTimeInformation.text}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <Text style={tw`text-lg px-5`}>No travel information available</Text>
                )}
            </View>
            <TouchableOpacity 
                onPress={handleFavourite}
                style={[
                    tw`absolute bottom-6 left-6 p-4 rounded-full`,
                    { backgroundColor: '#8871de' }
                ]}
            >
                <Icon
                    name="star"
                    type="antdesign"
                    color={isFavourited ? "#473E69" : "white"}
                    size={30}
                />
            </TouchableOpacity>
            <Text style={tw`absolute bottom-10 left-27 text-lg`}>Favourite this spot</Text>
        </View>
    );
};

export default NavigateCard;
