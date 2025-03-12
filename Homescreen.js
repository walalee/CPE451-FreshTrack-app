import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Screens
import AddProduct from './AddProduct';
import ConvertUnit from './ConvertUnit';
import Note from './Note';
import Profile from './Profile';
import CalendarScreen from './CalendarScreen';

const Tab = createBottomTabNavigator();

function HomeScreenComponent() {
  const [fontsLoaded] = useFonts({
    Prompt: require('./assets/Prompt-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const products = [
    { id: '1', name: 'เนื้อหมู', expiryDate: '26/02/2025', category: 'ของสด', location: 'ตู้เย็นช่องฟรีซ', daysLeft: 3 },
    { id: '2', name: 'แอปเปิ้ลแดง', expiryDate: '24/02/2025', category: 'ผลไม้', location: 'ตู้เย็นช่องผัก', daysLeft: 3 },
    { id: '3', name: 'เนื้อหมูสด', expiryDate: '04/03/2025', category: 'ของสด', location: 'ตู้เย็นช่องฟรีซ', daysLeft: 8 },
    { id: '4', name: 'ปลากระป๋อง', expiryDate: '12/07/2027', category: 'อาหารสำเร็จรูป', location: 'ตู้แห้ง', daysLeft: 868 }
    ];

  return (
    <View style={styles.container}>
      {/* Search Bar & Calendar & Filter */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="search" size={20} color="red" />
          <Text style={styles.searchText}>คลิกเพื่อค้นหาสินค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="calendar" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="filter" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      {/* Product List */}
      <FlatList
         data={products}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
           <View style={styles.card}>
             <Image source={{ uri: `https://picsum.photos/seed/${item.id}/50` }} style={styles.image} />
             <View style={styles.textContainer}>
               <Text style={styles.name}>{item.name}</Text>
               <Text style={styles.details}>วันหมดอายุ: {item.expiryDate}</Text>
               <Text style={styles.details}>หมวดหมู่: {item.category}</Text>
               <Text style={styles.details}>สถานที่เก็บ: {item.location}</Text>
               <Text style={styles.daysLeft}>เหลืออีก: {item.daysLeft} วัน</Text>
             </View>
           </View>
        )}
      />
    </View>
  );
}

export default function Homescreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: { backgroundColor: 'red', height: 60 },
          tabBarLabelStyle: { fontFamily: 'Prompt', fontSize: 14 },
        }}
      >
        <Tab.Screen 
          name="หน้าหลัก" 
          component={HomeScreenComponent} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: false, // ไม่ให้แสดง header บนสุด
          }}
        />
        <Tab.Screen 
          name="แปลงหน่วย" 
          component={ConvertUnit} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="swap-horizontal" size={size} color={color} />
            ),
          }}
        />
       <Tab.Screen 
          name="เพิ่มสินค้า" 
          component={AddProduct} 
          options={{
            tabBarIcon: ({ color }) => (
              <View style={styles.addButtonContainer}>
                <Icon name="add-circle" size={40} color={color} /> 
              </View>
            ),
            tabBarLabel: '',
            tabBarItemStyle: { position: 'center'}, // ทำให้ลอยขึ้นมา
          }}
        />

        <Tab.Screen 
          name="ฝากโน๊ต" 
          component={Note} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="pencil" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="โปรไฟล์" 
          component={Profile} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    flex: 1,
    marginRight: 10,
    marginTop: 20
  },
  searchText: {
    marginLeft: 10,
    color: 'gray',
    fontFamily: 'Prompt',
  },
  icon: { marginHorizontal: 5 },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 70, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontFamily: 'Prompt', fontWeight: 'bold' },
  details: { fontSize: 14, fontFamily: 'Prompt', color: 'gray' },
  daysLeft: { fontSize: 14, fontFamily: 'Prompt', color: 'red', fontWeight: 'bold' },
});