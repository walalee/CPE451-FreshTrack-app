import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, Alert } from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import { useRoute } from '@react-navigation/native';

const EditProductScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'),
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  // รับข้อมูล product จาก route params
  const route = useRoute();
  const { product } = route.params || {};

  // กำหนด state จากข้อมูล product
  const [productName, setProductName] = useState(product?.name || '');
  const [expiryDate, setExpiryDate] = useState(product?.expiry || '');
  const [category, setCategory] = useState(product?.category || '');
  const [location, setLocation] = useState(product?.location || '');
  const [quantity, setQuantity] = useState(product?.quantity || '');
  const [image, setImage] = useState(product?.image || null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const categories = [
    "อาหารสด",
    "ผักและผลไม้",
    "ยาและอุปกรณ์ทางการแพทย์",
    "อาหารแปรรูป",
    "เคมีภัณฑ์",
    "สำหรับสัตว์เลี้ยง",
    "ผลิตภัณฑ์ดูแลร่างกาย",
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

    Alert.alert(
      "บันทึกสำเร็จ",
      "ข้อมูลสินค้าถูกบันทึกเรียบร้อยแล้ว",
      [
        {
          text: "ตกลง",
          onPress: () => navigation.goBack(),
        }
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#A00000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>แก้ไขข้อมูลสินค้า</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>รูปภาพสินค้า</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            {image ? (
              <Image source={image} style={styles.image} />
            ) : (
              <Icon name="camera-alt" type="material" color="#888" size={32} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>ชื่อสินค้า</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>หมวดหมู่</Text>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryText}>{category}</Text>
          <Icon name="chevron-right" type="material" color="#888" size={24} />
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>บันทึก</Text>
        </TouchableOpacity>
      </ScrollView>

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

      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "PromptRegular",
  },
  content: { padding: 20 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "PromptRegular",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  image: { width: 100, height: 100, borderRadius: 8 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
    fontFamily: "PromptRegular",
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PromptRegular",
  },
  detailContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  detailTitle: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PromptRegular",
  },
  detailInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#000",
    fontFamily: "PromptRegular",
  },
  saveButton: {
    backgroundColor: "#A00000",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "PromptBold",
  },
  bottomBar: {
    backgroundColor: "#A00000",
    height: 80,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  categoryButton: {
    backgroundColor: "#F0F0F0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryButtonText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "PromptRegular",
  },
});

export default EditProductScreen;