// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Homescreen';
import ConvertUnit from './ConvertUnite'; // หากคุณมีคอมโพเนนต์นี้
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
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
      {/* เพิ่มหน้าอื่น ๆ ที่ต้องการใน Tab.Navigator */}
    </Tab.Navigator>
  );
};

export default MainTabs;
