import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

// สร้างคอมโพเนนต์จำลองบาร์โค้ด
const FakeBarcode = () => {
  return (
    <View style={styles.barcodeContainer}>
      {Array.from({ length: 40 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i % 5 === 0 ? 3 : 1,
            height: 60,
            backgroundColor: '#000',
            marginHorizontal: 1,
          }}
        />
      ))}
    </View>
  );
};

const CouponDetailScreenTops = ({ route }) => {
  const { coupon } = route.params;

  const [fontsLoaded] = useFonts({
    PromptRegular: require('../../assets/Prompt-Regular.ttf'),
    PromptLight: require('../../assets/Prompt-Light.ttf'),
    PromptBold: require('../../assets/Prompt-Bold.ttf'),
    PromptMedium: require('../../assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{coupon.title}</Text>
        <Text style={styles.description}>{coupon.description}</Text>
        <Text style={styles.expiryDate}>Expiry Date: {coupon.expiryDate}</Text>
        <Text style={styles.discount}>Discount: {coupon.discount}%</Text>

        {/* บาร์โค้ด */}
        <View style={styles.barcodeWrapper}>
          <FakeBarcode />
          <Text style={styles.barcodeText}>1234 5678 9012</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9D0300',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 15,
    marginTop: 80,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'PromptMedium',
    color: '#000', 
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'PromptRegular',
    color: '#000',
    marginBottom: 20,
  },
  expiryDate: {
    fontSize: 14,
    fontFamily: 'PromptLight',
    color: '#000',
    marginBottom: 10,
  },
  discount: {
    fontSize: 18,
    fontFamily: 'PromptMedium',
    fontWeight: 'bold',
    color: '#000',
  },
  barcodeWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  barcodeContainer: {
    flexDirection: 'row',
    height: 60,
    marginBottom: 10,
  },
  barcodeText: {
    fontSize: 16,
    fontFamily: 'PromptMedium',
    color: '#000',
  },
});

export default CouponDetailScreenTops;
