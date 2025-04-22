import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import HomeStack from './Homescreen';
import SignupScreen from './Singup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={HomeStack} />
        <Stack.Screen name="Signup" component={SignupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
