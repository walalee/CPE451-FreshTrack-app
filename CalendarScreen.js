import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const expiryData = [
  {
    id: '1',
    expiryDate: '24/02/2025',
    productName: 'แอปเปิลสด',
    category: 'ผลไม้',
    image: require('./assets/apple.jpg')
  },
  {
    id: '2',
    expiryDate: '24/02/2025',
    productName: 'นมวัว',
    category: 'เครื่องดื่ม',
    image: require('./assets/milk.jpg')
  }
];

const CalendarScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Calender</Text>
      </View>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate="2023-01-01"
        maxDate="2025-12-31"
        theme={{
          calendarBackground: '#fff',
          selectedDayBackgroundColor: '#e74c3c',
          todayTextColor: '#e74c3c',
          arrowColor: '#e74c3c',
          monthTextColor: '#e74c3c',
        }}
      />
      <ScrollView style={styles.expiryContainer}>
        {expiryData.map((item) => (
          <View key={item.id} style={styles.expiryCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.expiryDate}>วันหมดอายุ : {item.expiryDate}</Text>
              <Text style={styles.productName}>ชื่อสินค้า : {item.productName}</Text>
              <Text style={styles.category}>หมวดหมู่ : {item.category}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  expiryContainer: {
    marginTop: 10,
  },
  expiryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  expiryDate: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold'
  },
  productName: {
    fontSize: 14,
    color: '#333'
  },
  category: {
    fontSize: 14,
    color: '#666'
  }
});

export default CalendarScreen;