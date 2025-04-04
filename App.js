import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './loadingscreen'; 
import Homescreen from './Homescreen';  // ใช้ชื่อที่ถูกต้อง
import CouponScreen from './components/CouponScreen';
import CouponDetailScreen from './CouponDetailScreen';


const App = () => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <Homescreen />
  );
};

export default App;
