import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CalendarScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* วงกลมสีแดงเลือดหมูและมีเส้นรอบวงกลมใหญ่ */}
      <View style={styles.redCircle1} />
      <View style={styles.redCircle2} />
      <View style={styles.redCircle3} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Calendar</Text>
      </View>

      {/* ปฏิทิน */}
      <View style={styles.calendarWrapper}>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          minDate="2023-01-01"
          maxDate="2025-12-31"
          theme={{
            calendarBackground: 'white',
            selectedDayBackgroundColor: '#e74c3c',
            todayTextColor: '#e74c3c',
            arrowColor: '#e74c3c',
            monthTextColor: '#e74c3c',
            textSectionTitleColor: 'black',
            dayTextColor: 'black',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  /* วงกลมพื้นหลังสีแดงเลือดหมู */
  redCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: '#9D0300', // สีแดงเลือดหมู
    borderRadius: 125,
    top: -80,
    right: -50,
    opacity: 0.9,
    borderWidth: 8, // เพิ่มความหนาของเส้น
    borderColor: '#9D0300', // สีแดงเลือดหมู
    margin: 12, // ระยะห่างจากตัววงกลม
  },
  redCircle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    backgroundColor: '#9D0300', // สีแดงเลือดหมู
    borderRadius: 90,
    top: '40%', // ซ้ายกลาง
    left: -60,
    opacity: 0.8,
    borderWidth: 8, // เพิ่มความหนาของเส้น
    borderColor: '#9D0300', // สีแดงเลือดหมู
    margin: 12, // ระยะห่างจากตัววงกลม
  },
  redCircle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#9D0300', // สีแดงเลือดหมู
    borderRadius: 60,
    bottom: -30,
    right: 40,
    opacity: 0.7,
    borderWidth: 8, // เพิ่มความหนาของเส้น
    borderColor: '#9D0300', // สีแดงเลือดหมู
    margin: 12, // ระยะห่างจากตัววงกลม
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50, // ขยับทั้งปุ่มและข้อความลงมา 50 หน่วย
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  calendarWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginTop: 8, // เพิ่มระยะห่างด้านบนของปฏิทินจาก header
    elevation: 2,
  },
});

export default CalendarScreen;
