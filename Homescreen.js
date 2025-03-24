import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';  // เพิ่มการใช้งาน Stack.Navigator
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShrimp } from '@fortawesome/free-solid-svg-icons/faShrimp'
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons/faSuitcaseMedical'
import { faCarrot } from '@fortawesome/free-solid-svg-icons/faCarrot'
import { faJarWheat } from '@fortawesome/free-solid-svg-icons/faJarWheat'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faFlaskVial } from '@fortawesome/free-solid-svg-icons/faFlaskVial'
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
import FilterScreen from './components/FilterScreen';
import ExpirationScreen from './components/ExpirationScreen';
import CouponScreen from './components/CouponScreen';
import NotiScreen from './components/NotiScreen';
import CareScreen from './Category/CareScreen';
import ChemicalScreen from './Category/ChemicalScreen';
import FreshfoodScreen from './Category/FreshfoodScreen';
import MedicalScreen from './Category/MedicalScreen';
import Category from './Category/PetfoodScreen'; 
import ProcessedScreen from './Category/ProcessedScreen';
import VegFruitsScreen from './Category/VegFruitsScreen';
import Banner from './components/Banner';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  // สร้าง Stack Navigator
const {width} = Dimensions.get('window');

// HomeScreenComponent
function HomeScreenComponent() {

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    PromptRegular: require('./assets/Prompt-Regular.ttf'),
    PromptBold: require('./assets/Prompt-Bold.ttf'), 
    PromptMedium: require('./assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

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
        
        <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')} style={styles.filterIconContainer}>
            <Icon name="options-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.PromotionRow}>
        <Text style={styles.PromotionText}>Promotion</Text>
      </View>

      <Banner />

      <View style={styles.CategoryRow}>
        <Text style={styles.CategoryText}>Category</Text>
      </View>

      <View style ={{flexDirection: 'row'}}>
        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 8
          }}> 
          <FontAwesomeIcon icon={faShrimp} size={45} color="white"/>  
        </View>

        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 8
          }}>
          <FontAwesomeIcon icon={faCarrot} size={45} color="white"/>
        
        </View>
        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 8
          }}>
          <FontAwesomeIcon icon={faSuitcaseMedical} size={45} color="white"/>
        
        </View>

        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 20
          }}>
          <FontAwesomeIcon icon={faJarWheat} size={45} color="white"/>
        
        </View>
      </View>

      <View style ={{flexDirection: 'row'}}>
        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 8,
            marginTop: 30,
          }}> 
          <FontAwesomeIcon icon={faFlaskVial} size={45} color="white"/>  
        </View>

        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 8,
            marginTop: 30,
          }}>
          <FontAwesomeIcon icon={faBone} size={45} color="white"/>
        
        </View>
        <View
          style={{
            width: 80, // กำหนดขนาดวงกลม
            height: 80, 
            borderRadius: 40, // ทำให้เป็นวงกลม
            backgroundColor: "#9D0300", 
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 8,
            marginTop: 30,
          }}>
          <FontAwesomeIcon icon={faPumpSoap} size={45} color="white"/>
        
        </View>
      </View>
      

      





    </View>
  );
};
  


// Stack Navigator สำหรับการจัดการหน้า EditProduct
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreenComponent} 
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="EditProduct" 
        component={EditProduct}  // เพิ่ม EditProduct เข้ามาใน Stack
        options={{ title: 'แก้ไขสินค้า' }} 
      />
      <Stack.Screen 
        name="Calendar" 
        component={CalendarScreen}  
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Tab.Navigator สำหรับหน้าหลัก
export default function Homescreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: { 
            backgroundColor: '#9D0300', 
            height: 60, 
            position: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          },
          tabBarLabelStyle: { fontFamily: 'PromptMedium', fontSize: 12, },
        }}
      >
        <Tab.Screen 
          name="หน้าหลัก" 
          component={HomeStack}  // เปลี่ยนเป็น HomeStack แทน
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontFamily: 'Prompt', fontSize: 12 },
            headerShown: false, // ไม่ให้แสดง header บนสุด
          }}
        />
        <Tab.Screen 
          name="แปลงหน่วย" 
          component={ConvertUnit} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="scale-outline" size={size} color={color} />
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
              <Icon name="document-text-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="โปรไฟล์" 
          component={Profile} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
  greetingText: {
    marginLeft: 15,
    fontSize: 22,
    color: 'black',
    fontFamily: 'PromptMedium',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 15,
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
  
  icon: { marginRight: 20},

  filterIconContainer: {
    backgroundColor: '#E9E8E8',
    borderRadius: 10,
    padding: 5, 
    // marginLeft: 3, 
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
