import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login screen after 3 seconds
    }, 3000); 
  }, [navigation]);

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
