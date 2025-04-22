import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'; // เพิ่ม import useFonts

const CouponDetailScreenBigC = ({ route }) => {
  const { coupon } = route.params;

  // โหลดฟอนต์
  const [fontsLoaded] = useFonts({
    PromptRegular: require('./assets/Prompt-Regular.ttf'),
    PromptLight: require('./assets/Prompt-Light.ttf'),
    PromptBold: require('./assets/Prompt-Bold.ttf'),
    PromptMedium: require('./assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // ยังไม่โหลดฟอนต์เสร็จ
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{coupon.title}</Text>
      <Text style={styles.description}>{coupon.description}</Text>
      <Text style={styles.expiryDate}>Expiry Date: {coupon.expiryDate}</Text>
      <Text style={styles.discount}>Discount: {coupon.discount}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  title: {
    fontSize: 21,
    fontFamily: 'PromptBold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'PromptRegular',
    marginBottom: 20,
  },
  expiryDate: {
    fontSize: 14,
    fontFamily: 'PromptLight',
    marginBottom: 10,
  },
  discount: {
    fontSize: 18,
    fontFamily: 'PromptMedium',
    fontWeight: 'bold',
  },
});

export default CouponDetailScreenBigC;
