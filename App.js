import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Import FontAwesome6
import HomeScreen from './screens/HomeScreen';
import PlanterLocationScreen from './screens/PlanterLocationScreen';
import CameraScreen from './screens/CameraScreen';
import CommunityScreen from './screens/CommunityScreen'; // Import Community screen
import RedeemScreen from './screens/RedeemScreen'; // Import Redeem screen
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
                  iconName = focused ? 'camera' : 'people-group';
                } else if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Planter Mapper') {
                  iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === 'Community') {
                  iconName = focused ? 'people-group' : 'people-group'; // Adjusted icon for Community
                } else if (route.name === 'Redeem') {
                  iconName = focused ? 'cash' : 'cash-outline'; // Icon for Redeem
                }

                return <Icon name={iconName} size={size} color={color} />;
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
