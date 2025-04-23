import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../components/FilterScreen';

const { width } = Dimensions.get('window');

const FreshfoodScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
    // TODO: นำ selectedFilters ไปใช้กับการ query สินค้าจาก backend
  };

  const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'), 
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const freshProducts = [
    {
      name: 'นมสดรสจืด',
      expiry: '2025-05-10',
      category: 'อาหารสด',
      location: 'ตู้เย็น',
      quantity: '2 กล่อง',
      image: require('../assets/cardPic/milk.png'),
    },
    {
      name: 'ไข่ไก่เบอร์ 2',
      expiry: '2025-04-30',
      category: 'อาหารสด',
      location: 'ตู้เย็น',
      quantity: '10 ฟอง',
      image: require('../assets/cardPic/egg2.jpg'),
    },
    {
      name: 'เนื้อไก่แช่แข็ง',
      expiry: '2025-05-12',
      category: 'อาหารสด',
      location: 'ช่องฟรีซ',
      quantity: '2 แพ็ค',
      image: require('../assets/cardPic/chiken.png'),
    },
  ];

  // 🔍 กรองข้อมูลตาม searchText
  const filteredProducts = freshProducts.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Red Circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Prompt-Medium', fontSize: 18, marginLeft: 10 }}>
          อาหารสด
        </Text>
      </View>

      {/* Search & Filter */}
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

      {/* Filter Modal */}
      {filterVisible && (
        <FilterScreen
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
          filterOptions={['อาหารสด']}
        />
      )}

      {/* Card List */}
      <ScrollView contentContainerStyle={styles.cardList}>
        {filteredProducts.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>วันหมดอายุ: {item.expiry}</Text>
              <Text style={styles.text}>สถานที่เก็บ: {item.location}</Text>
              <Text style={styles.text}>จำนวน: {item.quantity}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  cardList: {
    paddingVertical: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'PromptBold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontFamily: 'PromptRegular',
    fontSize: 14,
    color: '#555',
  },
});

export default FreshfoodScreen;
