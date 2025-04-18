import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../components/FilterScreen';

const { width } = Dimensions.get('window');

const VegFruitsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'), 
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
    // TODO: นำ selectedFilters ไปใช้กับการ query สินค้าจาก backend
  };

  // ✅ ตัวเลือกกรองเฉพาะหมวดหมู่ผักและผลไม้
  const vegFruitFilters = [
    'ผักและผลไม้',
  ];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* วงกลมพื้นหลังสีแดง */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Prompt-Medium', fontSize: 18, marginLeft: 10 }}>
          ผักและผลไม้
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

      {/* แสดงหน้ากรอง */}
      {filterVisible && (
        <FilterScreen
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
          filterOptions={vegFruitFilters} // ✅ ส่งตัวเลือกกรองเข้ามา
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

export default VegFruitsScreen;
