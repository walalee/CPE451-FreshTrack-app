import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 2000); // แสดงหน้าโหลด 2 วินาที
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
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
    backgroundColor: '#FFFFFF', // สีพื้นหลังของ Splash Screen
  },
  logo: {
    width: 200, // ปรับขนาดโลโก้ตามต้องการ
    height: 100,
  },
});

export default SplashScreen;
