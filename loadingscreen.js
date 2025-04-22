import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();  // ดึง navigation แบบปลอดภัยจาก React Navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Login'); // เปลี่ยนหน้าไป Login
      }
    }, 3000);

    return () => clearTimeout(timer); // เคลียร์ timer เมื่อ unmount
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
    backgroundColor: '#9D0300',
  },
  logo: {
    width: 400,
    height: 200,
  },
});

export default SplashScreen;
