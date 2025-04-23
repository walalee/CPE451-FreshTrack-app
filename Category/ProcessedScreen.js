import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from '../components/FilterScreen';

const { width } = Dimensions.get('window');

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * ProcessedScreen is a React component that displays a list of processed food products.
 * It includes a search bar, filter options, and a list of products represented by 
 * ProductCard components. Users can filter the products using predefined categories.
 * The component uses custom fonts and displays styled background elements.
 * 
 * State:
 * - searchText: The current text in the search bar.
 * - filterVisible: A boolean indicating whether the filter options are visible.
 * - fontsLoaded: A boolean indicating whether custom fonts are loaded.
 * 
 * Functions:
 * - handleApplyFilters: Applies the selected filters and hides the filter options.
 * 
 * UI Elements:
 * - Search bar with an icon to filter products by name.
 * - Toggleable filter screen for selecting product categories.
 * - Displays a list of products in the 'อาหารแปรรูป' category.
 * 
 * Dependencies:
 * - Uses 'react-native-vector-icons/Ionicons' for icons.
 * - Uses 'expo-font' for loading custom fonts.
 * - Uses 'useNavigation' hook from '@react-navigation/native' for navigation.
 */

/*******  71c5beb1-1a66-47de-ae20-016bb9fb67e7  *******/const ProcessedScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
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

  const processedProducts = [
    {
      name: 'ข้าวหอมมะลิ',
      expiry: '2026-01-01',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '1 ถุง',
      image: require('../assets/cardPic/rice.jpg'),
    },
    {
      name: 'น้ำปลาแท้',
      expiry: '2026-12-15',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/fish.jpg'),
    },
    {
      name: 'น้ำดื่ม',
      expiry: '2026-03-01',
      category: 'อาหารแปรรูป',
      location: 'ชั้นวางของ',
      quantity: '6 ขวด',
      image: require('../assets/cardPic/water.jpg'),
    },
  ];

  const filteredProducts = processedProducts.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Prompt-Medium', fontSize: 18, marginLeft: 10 }}>
          อาหารแปรรูป
        </Text>
      </View>

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

      {filterVisible && (
        <FilterScreen
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
          filterOptions={['อาหารแปรรูป']}
        />
      )}

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
    backgroundColor: '#FFF4F4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
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
    color: '#333',
  },
});

export default ProcessedScreen;
