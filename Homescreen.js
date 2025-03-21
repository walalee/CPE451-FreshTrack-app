import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';  // เพิ่มการใช้งาน Stack.Navigator
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';

// Screens
import AddProduct from './AddProduct';
import ConvertUnit from './ConvertUnit';
import Note from './Note';
import Profile from './Profile';
import CalendarScreen from './CalendarScreen';
import EditProduct from './EditProduct';  // อย่าลืม import `EditProduct`
import FilterScreen from './FilterScreen';
import ExpirationScreen from './ExpirationScreen';
import CouponScreen from './CouponScreen';
import NotiScreen from './NotiScreen';
import CareScreen from './Category/CareScreen';
import ChemicalScreen from './Category/ChemicalScreen';
import FreshfoodScreen from './Category/FreshfoodScreen';
import MedicalScreen from './Category/MedicalScreen';
import Category from './Category/PetfoodScreen'; 
import ProcessedScreen from './Category/ProcessedScreen';
import VegFruitsScreen from './Category/VegFruitsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  // สร้าง Stack Navigator
const {width} = Dimensions.get('window');

const coupons = [
  { id: 1, image: require('./assets/lotusCoupon.png') },
  { id: 2, image: require('./assets/bigcCoupon.jpg') },
  { id: 3, image: require('./assets/marko.png') },
  { id: 4, image: require('./assets/topscoupon.jpg') },
];

// HomeScreenComponent
function HomeScreenComponent() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Prompt: require('./assets/Prompt-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      {/* Header: ข้อความต้อนรับ + ไอคอน */}
      <View style={styles.headerRow}>
        <Text style={styles.greetingText}>สวัสดีผู้ใช้</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Icon name="calendar-clear-outline" size={26} color="#9D0300" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="notifications-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#706A6A" />
          <Text style={styles.searchText}>คลิกเพื่อค้นหาสินค้า</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')} style={styles.filterIconContainer}>
            <Icon name="options-outline" size={26} color="black" />
          </TouchableOpacity>
      </View>

      <View style={styles.PromotionRow}>
        <Text style={styles.PromotionText}>Promotion</Text>
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

export function CouponCarousel() {
  return (
    <View style={{ width: '100%', height: 200 }}>
      <Swiper loop autoplay showsPagination={true}>
        {coupons.map((coupon) => (
          <View key={coupon.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={coupon.image}
              style={{ width: width * 0.8, height: '100%', resizeMode: 'contain' }}
            />
          </View>
        ))}
      </Swiper>
    </View>
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
          tabBarLabelStyle: { fontFamily: 'Prompt', fontSize: 12, },
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Prompt-Regular',
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
    fontFamily: 'Prompt',
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
    backgroundColor: '#E9E8E8', // สีพื้นหลัง (สามารถเปลี่ยนเป็นสีอื่นได้)
    borderRadius: 10, // ทำให้ขอบมน
    padding: 5, // เพิ่มขนาดพื้นที่รอบไอคอน
    // marginLeft: 3, 
  },

  PromotionRow: {
    flexDirection: 'row',         // จัดเรียงองค์ประกอบในแนวนอน (row)
    justifyContent: 'space-between', // จัดให้อยู่ซ้าย-ขวาห่างกันพอดี
    alignItems: 'center',         // จัดให้อยู่ตรงกลางในแนวตั้ง
    marginBottom: 5,              // เพิ่มระยะห่างด้านล่าง 5
    paddingRight: 20
  }, 

  PromotionText: { 
    fontFamily: 'Prompt',
    fontSize: 18,
    color: 'black',
    //fontWeight: 'bold',
    marginLeft: 15,
  },

  image: { width: 70, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontFamily: 'Prompt', fontWeight: 'bold' },
  details: { fontSize: 14, fontFamily: 'Prompt', color: 'gray' },
  daysLeft: { fontSize: 14, fontFamily: 'Prompt', color: 'red', fontWeight: 'bold' },
});
