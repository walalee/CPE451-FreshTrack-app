// นำเข้า React และ Hook ที่จำเป็นจาก React Native และไลบรารีต่าง ๆ
import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Modal, ScrollView, Alert
} from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker"; // สำหรับเลือกภาพจากแกลเลอรี
import { useFonts } from "expo-font"; // โหลดฟอนต์ใช้งานเอง
import { useRoute } from '@react-navigation/native'; // ใช้รับค่าจาก route params

// Component หลัก
const EditProductScreen = ({ navigation }) => {
  // โหลดฟอนต์ Prompt จาก assets
  const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'),
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  // ดึง product ที่ส่งมาจากหน้าอื่นผ่าน route.params
  const route = useRoute();
  const { product } = route.params || {};

  // ตั้งค่าข้อมูล state เริ่มต้นจาก product
  const [productName, setProductName] = useState(product?.name || '');
  const [expiryDate, setExpiryDate] = useState(product?.expiry || '');
  const [category, setCategory] = useState(product?.category || '');
  const [location, setLocation] = useState(product?.location || '');
  const [quantity, setQuantity] = useState(product?.quantity || '');
  const [image, setImage] = useState(product?.image || null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  // รายการหมวดหมู่สินค้า
  const categories = [
    "อาหารสด", "ผักและผลไม้", "ยาและอุปกรณ์ทางการแพทย์",
    "อาหารแปรรูป", "เคมีภัณฑ์", "สำหรับสัตว์เลี้ยง", "ผลิตภัณฑ์ดูแลร่างกาย",
  ];

  // ฟังก์ชันเลือกภาพจากแกลเลอรี
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // เซตภาพที่เลือกเข้า state
    }
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name: productName,
      expiry: expiryDate,
      category: category,
      location: location,
      quantity: quantity,
      image: image
    };

    // แสดง Alert และย้อนกลับหน้าก่อนหน้า
    Alert.alert("บันทึกสำเร็จ", "ข้อมูลสินค้าถูกบันทึกเรียบร้อยแล้ว", [
      { text: "ตกลง", onPress: () => navigation.goBack() }
    ]);
  };

  // ถ้าฟอนต์ยังโหลดไม่เสร็จ ให้ return null เพื่อรอ
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* หัวข้อด้านบน */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#A00000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>แก้ไขข้อมูลสินค้า</Text>
      </View>

      {/* ฟอร์มแก้ไขข้อมูล */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* รูปสินค้า */}
        <Text style={styles.label}>รูปภาพสินค้า</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Icon name="camera-alt" type="material" color="#888" size={32} />
            )}
          </TouchableOpacity>
        </View>

        {/* ช่องกรอกชื่อ */}
        <Text style={styles.label}>ชื่อสินค้า</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />

        {/* เลือกหมวดหมู่ */}
        <Text style={styles.label}>หมวดหมู่</Text>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryText}>{category}</Text>
          <Icon name="chevron-right" type="material" color="#888" size={24} />
        </TouchableOpacity>

        {/* รายละเอียดอื่น ๆ */}
        <Text style={styles.label}>รายละเอียด</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>วันหมดอายุ</Text>
            <TextInput
              style={styles.detailInput}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>สถานที่เก็บ</Text>
            <TextInput
              style={styles.detailInput}
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>จำนวน</Text>
            <TextInput
              style={styles.detailInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* ปุ่มบันทึก */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>บันทึก</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal สำหรับเลือกหมวดหมู่ */}
      <Modal visible={categoryModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => {
                  setCategory(cat);
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.categoryButtonText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* แถบล่างโค้งสีแดง */}
      <View style={styles.bottomBar} />
    </View>
  );
};

export default EditProductScreen;
