import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShrimp } from '@fortawesome/free-solid-svg-icons/faShrimp'
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons/faSuitcaseMedical'
import { faCarrot } from '@fortawesome/free-solid-svg-icons/faCarrot'
import { faJarWheat } from '@fortawesome/free-solid-svg-icons/faJarWheat'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faJugDetergent} from '@fortawesome/free-solid-svg-icons/faJugDetergent'
import { faBone } from '@fortawesome/free-solid-svg-icons/faBone'
import { faPumpSoap} from '@fortawesome/free-solid-svg-icons/faPumpSoap'

import { useFonts } from 'expo-font';

// Screens
import AddProduct from './components/AddProduct';
import ConvertUnit from './components/ConvertUnit';
import Note from './components/Note';
import Profile from './components/Profile';
import CalendarScreen from './components/CalendarScreen';
import EditProduct from './components/EditProduct'; 
import SearchScreen from './components/SearchScreen';
import ExpirationScreen from './components/ExpirationScreen';
import NotiScreen from './components/NotiScreen';
import Banner from './components/Banner';
import StorageGuideScreen from './components/FreshFoodTable';
import Card from './components/Card';


import FreshfoodScreen from './Category/FreshfoodScreen';
import VegFruitsScreen from './Category/VegFruitsScreen';
import MedicalScreen from './Category/MedicalScreen';
import ProcessedScreen from './Category/ProcessedScreen';
import ChemicalScreen from './Category/ChemicalScreen';
import PetfoodScreen from './Category/PetfoodScreen'; 
import CareScreen from './Category/CareScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  
const {width} = Dimensions.get('window');

// HomeScreenComponent
function HomeScreenComponent() {

  const [filterVisible, setFilterVisible] = useState(false);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const [fontsLoaded] = useFonts({
    PromptRegular: require('./assets/Prompt-Regular.ttf'),
    PromptLight: require('./assets/Prompt-Light.ttf'),
    PromptBold: require('./assets/Prompt-Bold.ttf'), 
    PromptMedium: require('./assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header: ข้อความต้อนรับ + ไอคอน */}
        <View style={styles.headerRow}>
          <Text style={styles.greetingText}>สวัสดี</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
              <FontAwesomeIcon icon={faCalendar} size={26} color="#9D0300"/> 
            </TouchableOpacity>

            <TouchableOpacity>
            <FontAwesomeIcon icon={faBell} size={26} color="#9D0300"/> 
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.searchBar}>
              <Icon name="search" size={20} color="#706A6A" />
              <Text style={styles.searchText}>คลิกเพื่อค้นหาสินค้า</Text>
            </TouchableOpacity>  
          
        </View>

        <View style={styles.PromotionRow}>
          <Text style={styles.PromotionText}>Promotion</Text>
        </View>

        <Banner />

        <View style={styles.CategoryRow}>
          <Text style={styles.CategoryText}>Category</Text>
        </View>

        <View style ={{flexDirection: 'row',marginTop: 5,}}>
          <TouchableOpacity onPress={() => navigation.navigate('FreshfoodScreen')}>
            <View style={{ alignItems: 'center'}}>
              <View
                style={{
                  width: 80, // กำหนดขนาดวงกลม
                  height: 80, 
                  borderRadius: 40, // ทำให้เป็นวงกลม
                  backgroundColor: "#9D0300", 
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 20,
                  marginRight: 5
                }}> 
                <FontAwesomeIcon icon={faShrimp} size={45} color="white"/>  
              </View>
                <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>อาหารสด</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('VegFruitsScreen')}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#9D0300",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5
              }}>
                <FontAwesomeIcon icon={faCarrot} size={45} color="white"/>
              </View>
              <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>ผักและผลไม้</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('MedicalScreen')}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#9D0300",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5
              }}>
                <FontAwesomeIcon icon={faSuitcaseMedical} size={45} color="white"/>
              </View>
              <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>เวชภัณฑ์</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('ProcessedScreen')}>
            <View style={{ alignItems: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#9D0300",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                marginRight: 20
              }}>
                <FontAwesomeIcon icon={faJarWheat} size={45} color="white"/>
              </View>
              <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>อาหารแปรรูป</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style ={{flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('ChemicalScreen')}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#9D0300",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
              marginRight: 5
            }}>
              <FontAwesomeIcon icon={faJugDetergent} size={45} color="white"/>
            </View>
            <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>เคมีภัณฑ์</Text>
          </View>
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate('PetfoodScreen')}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#9D0300",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5
            }}>
              <FontAwesomeIcon icon={faBone} size={45} color="white"/>
            </View>
            <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'PromptMedium', color: '#333' }}>สำหรับสัตว์เลี้ยง</Text>
          </View>
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate('CareScreen')}>
        <View style={{ alignItems: 'center', width: 100 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#9D0300",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5
          }}>
            <FontAwesomeIcon icon={faPumpSoap} size={45} color="white"/>
            </View>
            <Text style={{
              marginTop: 6,
              fontSize: 14,
              fontFamily: 'PromptMedium',
              color: '#333',
              textAlign: 'center',
              flexWrap: 'wrap'
            }}>
              ผลิตภัณฑ์ดูแลร่างกาย
            </Text>
          </View>
        </TouchableOpacity>
      </View>

        <View style={styles.CategoryRow}>
          <Text style={styles.CategoryText}>Expiration</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Card />
        </View>
      </ScrollView>
    </View>
  );
};

// Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreenComponent} options={{headerShown: false,}}/>
      <Stack.Screen name="EditProduct" component={EditProduct} options={{ title: 'แก้ไขสินค้า', headerShown: false,}} />
      <Stack.Screen name="Calendar" component={CalendarScreen}  options={{headerShown: false,}}/>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />

      <Stack.Screen name="FreshfoodScreen" component={FreshfoodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VegFruitsScreen" component={VegFruitsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MedicalScreen" component={MedicalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProcessedScreen" component={ProcessedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChemicalScreen" component={ChemicalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PetfoodScreen" component={PetfoodScreen}options={{ headerShown: false }}  />
      <Stack.Screen name="CareScreen" component={CareScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FreshfoodTable" component={StorageGuideScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Crad" component={Card} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}

// Tab.Navigator สำหรับหน้าหลัก
export default function Homescreen() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#9D0300',
        height: 60,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
      },
      tabBarLabelStyle: { 
        fontFamily: 'PromptMedium', 
        fontSize: 12,
        paddingBottom: 5,
      },
      tabBarItemStyle: { 
        paddingVertical: 5,
      },
    }}
  >
    <Tab.Screen 
      name="หน้าหลัก" 
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home-outline" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen 
      name="แปลงหน่วย" 
      component={ConvertUnit} 
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="scale-outline" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen 
      name="เพิ่มสินค้า" 
      component={AddProduct} 
      options={{
        tabBarIcon: ({ color }) => (
          <View style={styles.addButtonContainer}>
            <Icon name="add-circle" size={44} color={color} />
          </View>
        ),
        tabBarLabel: '',
        headerShown: false,
      }}
    />
    <Tab.Screen 
      name="ฝากโน๊ต" 
      component={Note} 
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="document-text-outline" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen 
      name="โปรไฟล์" 
      component={Profile} 
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="person-outline" size={24} color={color} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 50 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight: 20
  },
  addButtonContainer: {
    position: 'absolute',
    top: -7,
    backgroundColor: '#9D0300',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  greetingText: {
    marginLeft: 15,
    fontSize: 22,
    color: 'black',
    fontFamily: 'PromptMedium',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
    marginLeft: 10,
    color: '#706A6A',
    fontFamily: 'PromptMedium',
  },

  statusBar: {
    height: 10,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 5,
  },
  
  icon: { marginRight: 15},

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

  PromotionRow: {
    flexDirection: 'row',        
    justifyContent: 'space-between', 
    alignItems: 'center',         
    marginBottom: 5,              
    paddingRight: 20
  }, 

  PromotionText: { 
    fontFamily: 'PromptMedium',
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
  },

  CategoryRow: {
    flexDirection: 'row',        
    justifyContent: 'space-between', 
    alignItems: 'center',         
    marginBottom: 5,              
    paddingRight: 20
  }, 

  CategoryText: { 
    fontFamily: 'PromptMedium',
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
  },

  image: { width: 70, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontFamily: 'Prompt', fontWeight: 'bold' },
  details: { fontSize: 14, fontFamily: 'Prompt', color: 'gray' },
  daysLeft: { fontSize: 14, fontFamily: 'Prompt', color: 'red', fontWeight: 'bold' },
});
