import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc'; 
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

const NavFavourites = ({ favourites, origin, onSelect }) => {
    const navigation = useNavigation();
    const route = useRoute();

    if (!favourites || !Array.isArray(favourites)) {
        return null;
    }

    const handlePress = (item) => {
        if (route.name === 'StudyMapperScreen') {
            onSelect(item);
            navigation.navigate('MapScreen');
        }
    };

    const keyExtractor = (item, index) => {
        // Use item.id if available, otherwise create a unique key using description and index
        return item.id ? item.id : `${item.description}-${index}`;
    };

    return (
        <View>
            <Text style={[tw`text-xl font-bold p-5`, { textAlign: 'center' }]}>Favourite Study Spots</Text>
            {favourites.length === 0 ? (
                <Text style={tw`text-center text-gray-500`}>No study spots to show</Text>
            ) : (
                <FlatList
                    data={favourites} 
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={() => (
                        <View
                            style={[tw`bg-gray-200`, { height: 1 }]}
                        />
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[
                                tw`flex-row items-center p-5`,
                                !origin && { backgroundColor: '#A9A9A9' }
                            ]}
                            onPress={() => handlePress(item)}
                            disabled={!origin}
                        >
                            <Icon style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                                name="map-marker"
                                type="font-awesome"
                                color="black"
                                size={18}
                            />
                            <View>
                                <Text style={tw`font-semibold text-lg`}>
                                    {item.description.includes('Cafe') ? 'Cafe' : 'Library'}
                                </Text>
                                <Text style={tw`text-xs text-gray-500 pt-1`}>
                                    {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default NavFavourites;

const styles = StyleSheet.create({});
