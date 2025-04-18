import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../components/FilterScreen';

const { width } = Dimensions.get('window');

const MedicalScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
    // TODO: นำ selectedFilters ไปใช้กับการ query สินค้าจาก backend
  };

  // ✅ ตัวเลือกฟิลเตอร์สำหรับหมวดเวชภัณฑ์
  const medicalFilters = [
    'เวชภัณฑ์',
  ];

  const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'), 
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* พื้นหลังวงกลมแดง */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />

      {/* หัวข้อ + ปุ่มย้อนกลับ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Prompt-Medium', fontSize: 18, marginLeft: 10 }}>
          เวชภัณฑ์
        </Text> 
      </View>

      {/* แถบค้นหา + ปุ่มฟิลเตอร์ */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#706A6A" />
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหาสินค้า"
            placeholderTextColor="#706A6A"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.filterIconContainer}>
          <Icon name="options-outline" size={31} color="black" />
        </TouchableOpacity>
      </View>

      {/* แสดงกล่องฟิลเตอร์ */}
      {filterVisible && (
        <FilterScreen
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
          filterOptions={medicalFilters} // ✅ ส่งตัวเลือกฟิลเตอร์
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    position: 'relative',
  },
  circleTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#8B0000',
  },
  circleMiddleLeft: {
    position: 'absolute',
    top: '40%',
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8B0000',
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#8B0000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, 
  },
  headerText: {
    fontFamily: 'PromptMedium',
    fontSize: 18,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    fontFamily: 'PromptMedium',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    flex: 1,
    paddingVertical: 0,
    height: 40,
  },
  filterIconContainer: {
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    padding: 5,
  },
});

export default MedicalScreen;
