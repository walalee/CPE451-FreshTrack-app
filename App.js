import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './loadingscreen'; 
import Homescreen from './Homescreen'; 
import LoginScreen from './Login';

const App = () => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <LoginScreen />
  );
};

export default App;