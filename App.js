import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './loadingscreen'; 
import LoginScreen from './Login';
import Homescreen from './Homescreen';

const App = () => {
  const [loading, setLoading] = useState(true);       // ควบคุม splash
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ควบคุม login

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <Homescreen />;
};

export default App;
