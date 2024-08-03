import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';

const MapScreen = () => {
    const Stack = createStackNavigator();
  return (
    <View>
      <View style={tw`h-7/10`}><Map /></View>
      <View style={tw`h-3/10`}>
        <Stack.Navigator>
            <Stack.Screen
                name="NavigateCard"
                component={NavigateCard}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
      </View>
</View>
  );
};

export default MapScreen;
