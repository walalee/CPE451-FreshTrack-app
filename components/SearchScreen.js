import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from './FilterScreen';

const {width} = Dimensions.get('window');

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
    // TODO: นำ selectedFilters ไปใช้กับการ query สินค้าจาก backend
  };

  return (
    <View style={styles.container}>
      {/* Red Circles Background */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />
      
      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#706A6A" />
          <Text style={styles.searchText}>คลิกเพื่อค้นหาสินค้า</Text>
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
    marginTop: 50, // Adjusted to move down by 50
  },
  headerText: {
    fontFamily: 'PromptMedium',
    fontSize: 18,
    fontWeight: 'bold',
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
    padding: 10,
    flex: 1,
    marginRight: 10,
    marginTop: 5
  },
  searchText: {
    fontFamily: 'PromptMedium',
    fontSize: 16,
    color: '#706A6A',
    marginLeft: 10,
  },
  filterIconContainer: {
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    padding: 5, 
    // marginLeft: 3, 
  },
  filterButton: {
    backgroundColor: '#E9E8E8',
    padding: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default SearchScreen;