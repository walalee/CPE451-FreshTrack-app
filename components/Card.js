// card.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('EditProduct', { product });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={product.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.text}>วันหมดอายุ: {product.expiry}</Text>
        <Text style={styles.text}>หมวดหมู่: {product.category}</Text>
        <Text style={styles.text}>สถานที่เก็บ: {product.location}</Text>
        <Text style={styles.text}>จำนวน: {product.quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};


const Card = () => {
  const products = [
    {
      name: 'นมสดรสจืด',
      expiry: '2025-05-10',
      category: 'อาหารสด',
      location: 'ตู้เย็น',
      quantity: '2 กล่อง',
      image: require('../assets/cardPic/milk.png')
    },
    {
      name: 'ข้าวหอมมะลิ',
      expiry: '2026-01-01',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '1 ถุง',
      image: require('../assets/cardPic/rice.jpg')
    },
    {
      name: 'ไข่ไก่เบอร์ 2',
      expiry: '2025-04-30',
      category: 'อาหารสด',
      location: 'ตู้เย็น',
      quantity: '10 ฟอง',
      image: require('../assets/cardPic/egg2.jpg')
    },
    {
      name: 'น้ำปลาแท้',
      expiry: '2026-12-15',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/fish.jpg')
    },
    {
      name: 'น้ำดื่ม',
      expiry: '2026-03-01',
      category: 'อาหารแปรรูป',
      location: 'ชั้นวางของ',
      quantity: '6 ขวด',
      image: require('../assets/cardPic/water.jpg')
    },
    {
      name: 'ยาสีฟันสมุนไพร',
      expiry: '2026-06-20',
      category: 'ผลิตภัณฑ์ดูแลร่างกาย',
      location: 'ห้องน้ำ',
      quantity: '1 หลอด',
      image: require('../assets/cardPic/tooth.jpg')
    },
    {
      name: 'แชมพูสูตรเย็น',
      expiry: '2026-08-05',
      category: 'ผลิตภัณฑ์ดูแลร่างกาย',
      location: 'ห้องน้ำ',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/shampooclear.jpg')
    },
    {
      name: 'ผงซักฟอก',
      expiry: '2026-11-30',
      category: 'เคมีภัณฑ์',
      location: 'ห้องเก็บของ',
      quantity: '1 ถุง',
      image: require('../assets/cardPic/washing.png')
    },
    {
      name: 'ขนมปังกรอบ',
      expiry: '2025-07-15',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '3 ซอง',
      image: require('../assets/cardPic/bread_2.png')
    },
    {
      name: 'นมเปรี้ยวรสสตรอว์เบอร์รี่',
      expiry: '2025-04-28',
      category: 'อาหารแปรรูป',
      location: 'ตู้เย็น',
      quantity: '2 ขวด',
      image: require('../assets/cardPic/milkStrawberr.png')
    },
    {
      name: 'ซอสพริก',
      expiry: '2026-04-12',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/tomato.png')
    },
    {
      name: 'น้ำยาล้างจาน',
      expiry: '2026-09-18',
      category: 'เคมีภัณฑ์',
      location: 'ห้องครัว',
      quantity: '2 ขวด',
      image: require('../assets/cardPic/washinglemon.jpg')
    },
    {
      name: 'สบู่เหลวล้างมือ',
      expiry: '2026-10-10',
      category: 'ผลิตภัณฑ์ดูแลร่างกาย',
      location: 'ห้องน้ำ',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/dettol.jpg')
    },
    {
      name: 'ปลากระป๋อง',
      expiry: '2026-07-25',
      category: 'อาหารแปรรูป',
      location: 'ตู้กับข้าว',
      quantity: '4 กระป๋อง',
      image: require('../assets/cardPic/rosa.jpg')
    },
    {
      name: 'อาหารเปียกแมว',
      expiry: '2025-06-05',
      category: 'สำหรับสัตว์เลี้ยง',
      location: 'ชั้นวางของ',
      quantity: '2 ซอง',
      image: require('../assets/cardPic/catfood.png')
    },
    {
      name: 'น้ำมันพืช',
      expiry: '2026-02-20',
      category: 'อาหารแปรรูป',
      location: 'ห้องครัว',
      quantity: '1 ขวด',
      image: require('../assets/cardPic/oil.jpg')
    },
    {
      name: 'ทิชชูเปียก',
      expiry: '2026-12-01',
      category: 'ผลิตภัณฑ์ดูแลร่างกาย',
      location: 'ห้องน้ำ',
      quantity: '2 แพ็ค',
      image: require('../assets/cardPic/wet.jpg')
    },
    {
      name: 'ไอศกรีมรสวนิลา',
      expiry: '2025-05-01',
      category: 'อาหารแปรรูป',
      location: 'ช่องฟรีซ',
      quantity: '1 ถ้วย',
      image: require('../assets/cardPic/ice.png')
    },
    {
      name: 'เนื้อไก่แช่แข็ง',
      expiry: '2025-05-12',
      category: 'อาหารสด',
      location: 'ช่องฟรีซ',
      quantity: '2 แพ็ค',
      image: require('../assets/cardPic/chiken.png')
    },
    {
      name: 'น้ำโค้ก',
      expiry: '2026-01-30',
      category: 'อาหารแปรรูป',
      location: 'ตู้เย็น',
      quantity: '4 กระป๋อง',
      image: require('../assets/cardPic/cola.jpg')
    }
  ];
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15
  },
  details: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontFamily: "PromptBold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    fontFamily: "PromptRegular",
    marginBottom: 3
  }
});

export default Card;