

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store'; // Ensure the path to your store is correct
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import PlanterLocationScreen from './screens/PlanterLocationScreen';
import CameraScreen from './screens/CameraScreen';
import CommunityScreen from './screens/CommunityScreen';
import RedeemScreen from './screens/RedeemScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PlanterLocationScreen" component={PlanterLocationScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -30 : 0}
          >
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Green Snapper') {
                    iconName = focused ? 'camera' : 'camera-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Planter Mapper') {
                    iconName = focused ? 'map' : 'map-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Community') {
                    iconName = focused ? 'people' : 'people-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Redeem') {
                    iconName = focused ? 'cash' : 'cash-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  }

                  return null;
                },
                headerShown: false,
                tabBarActiveTintColor: '#059212',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                  display: 'flex'
                }
              })}
            >
              <Tab.Screen name="Green Snapper" component={CameraScreen} />
              <Tab.Screen name="Community" component={CommunityScreen} />
              <Tab.Screen name="Home" component={HomeStack} />
              <Tab.Screen name="Redeem" component={RedeemScreen} />
              <Tab.Screen name="Planter Mapper" component={PlanterLocationScreen} />
            </Tab.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
