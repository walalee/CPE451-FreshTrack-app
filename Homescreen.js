import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Homescreen';
import SearchScreen from './SearchScreen';
import CalendarScreen from './CalendarScreen';
import AddProduct from './AddProduct';
import Note from './Note';
import Profile from './Profile';
import ConvertUnit from './ConvertUnite';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Convert" 
        component={ConvertUnit} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="swap-horiz" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={AddProduct} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Note" 
        component={Note} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="note" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" type="material" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs; 
