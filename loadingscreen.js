import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logoWhite.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9D0300', // สีพื้นหลังของ Splash Screen
  },
  logo: {
    width: 400, // ปรับขนาดโลโก้ตามต้องการ
    height: 200,
  },
});

export default SplashScreen;