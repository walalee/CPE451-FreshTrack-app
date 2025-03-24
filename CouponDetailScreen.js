import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CouponDetailScreen = ({ route }) => {
  // รับข้อมูลจากหน้าอื่น (ถ้ามี)
  const { coupon } = route.params;

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  expiryDate: {
    fontSize: 14,
    marginBottom: 10,
  },
  discount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CouponDetailScreen;
