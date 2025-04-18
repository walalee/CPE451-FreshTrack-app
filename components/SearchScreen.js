import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FilterScreen from './FilterScreen';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); 
  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (selectedFilters) => {
    console.log('Filters applied:', selectedFilters);
    setFilterVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Red Circles Background */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleMiddleLeft} />
      <View style={styles.circleBottomRight} />
      
      {/* Search Bar and Filter Button */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#706A6A" />
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหาสินค้า..."
            placeholderTextColor="#706A6A"
            value={searchText}
            onChangeText={setSearchText}
            underlineColorAndroid="transparent"
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
        />
      )}
    </SafeAreaView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    fontFamily: 'PromptMedium',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    flex: 1,
    padding: 0,
  },
  filterIconContainer: {
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    padding: 5,
  },
});

export default SearchScreen;
