import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFonts, Prompt_400Regular, Prompt_700Bold } from "@expo-google-fonts/prompt";
import { useFonts } from 'expo-font';

const EditProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("หมวดหมู่");
  const [expiryDate, setExpiryDate] = useState("00/00/00");
  const [storageLocation, setStorageLocation] = useState("ช่องฟรีซตู้นี้");
  const [image, setImage] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Loading fonts
  }

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

  const handleBarCodeScanned = ({ data }) => {
    setProductName(data);
    setScannerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#A00000" size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: "Prompt_700Bold" }]}>แก้ไขข้อมูลสินค้า</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.label, { fontFamily: "Prompt_700Bold" }]}>รูปภาพสินค้า</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Icon name="camera-alt" type="material" color="#888" size={32} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanIcon} onPress={() => setScannerVisible(true)}>
            <Icon name="qr-code-scanner" type="material" color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { fontFamily: "Prompt_700Bold" }]}>ชื่อสินค้า</Text>
        <TextInput
          style={[styles.input, { fontFamily: "Prompt_400Regular" }]}
          placeholder="ชื่อสินค้า"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={[styles.label, { fontFamily: "Prompt_700Bold" }]}>หมวดหมู่</Text>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={[styles.categoryText, { fontFamily: "Prompt_400Regular" }]}>
            {selectedCategory}
          </Text>
          <Icon name="chevron-right" type="material" color="#888" size={24} />
        </TouchableOpacity>

        <Text style={[styles.label, { fontFamily: "Prompt_700Bold" }]}>รายละเอียด</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTitle, { fontFamily: "Prompt_400Regular" }]}>วันหมดอายุ</Text>
            <TextInput
              style={[styles.detailInput, { fontFamily: "Prompt_400Regular" }]}
              placeholder="00/00/00"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailTitle, { fontFamily: "Prompt_400Regular" }]}>สถานที่เก็บ</Text>
            <TextInput
              style={[styles.detailInput, { fontFamily: "Prompt_400Regular" }]}
              placeholder="ตู้เย็น"
              value={storageLocation}
              onChangeText={setStorageLocation}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={[styles.saveButtonText, { fontFamily: "Prompt_700Bold" }]}>Save Product</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* หมวดหมู่ Modal */}
      <Modal visible={categoryModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => {
                  setSelectedCategory(category);
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={[styles.categoryButtonText, { fontFamily: "Prompt_400Regular" }]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Barcode Scanner Modal */}
      <Modal visible={scannerVisible} transparent animationType="slide">
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <TouchableOpacity
            style={styles.closeScannerButton}
            onPress={() => setScannerVisible(false)}
          >
            <Text style={[styles.closeScannerText, { fontFamily: "Prompt_700Bold" }]}>ปิด</Text>
          </TouchableOpacity>
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
  headerTitle: { fontSize: 18, marginLeft: 10 },
  content: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
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
  scanIcon: {
    marginLeft: 200,
    backgroundColor: "#A00000",
    borderRadius: 70,
    padding: 7,
    marginTop: 58,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
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
  categoryText: { fontSize: 16, color: "#000" },
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
  detailTitle: { fontSize: 16, color: "#000" },
  detailInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#000",
  },
  saveButton: {
    backgroundColor: "#A00000",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { fontSize: 18, color: "#fff" },
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
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  closeScannerButton: {
    backgroundColor: "#A00000",
    padding: 12,
    alignItems: "center",
  },
  closeScannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProductScreen;
