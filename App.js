import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './loadingscreen'; 
import Homescreen from './Homescreen';
import MainTabs from './MainTabs'; // หากคุณใช้ MainTabs เป็น Navigator หลัก
import SearchScreen from './SearchScreen'; // แก้ไขให้ชื่อไฟล์ตรงกับที่มีจริง
import CalendarScreen from './CalendarScreen';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
