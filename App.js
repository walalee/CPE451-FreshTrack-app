import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './loadingscreen'; // นำเข้า Splash Screen

const App = () => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen onFinish={() => setLoading(false)} />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
};


export default App;
