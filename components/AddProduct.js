import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFonts } from 'expo-font';
import {
  useFonts,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_700Bold,
} from "@expo-google-fonts/prompt";

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
    Prompt_500Medium,
    Prompt_700Bold,
  });

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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#A00000" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#A00000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>เพิ่มข้อมูลสินค้า</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>รูปภาพสินค้า</Text>
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

        <Text style={styles.label}>ชื่อสินค้า</Text>
        <TextInput
          style={styles.input}
          placeholder="ชื่อสินค้า"
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>หมวดหมู่</Text>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.categoryText}>{selectedCategory}</Text>
          <Icon name="chevron-right" type="material" color="#888" size={24} />
        </TouchableOpacity>

        <Text style={styles.label}>รายละเอียด</Text>
        <View style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>วันหมดอายุ</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="00/00/00"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>สถานที่เก็บ</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="ตู้เย็น"
              value={storageLocation}
              onChangeText={setStorageLocation}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => {/* ใส่ navigation หรือ modal ได้ที่นี่ */}}>
          <Text style={styles.infoText}>
            ดูตารางแนะนำการเก็บอาหารสด คลิก
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal: เลือกหมวดหมู่ */}
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
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal: แสกนบาร์โค้ด */}
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
            <Text style={styles.closeScannerText}>ปิด</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.bottomBar} />
    </View>
  );
};

const fontFamily = "Prompt_400Regular";

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
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10, fontFamily },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5, fontFamily },
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
    fontFamily,
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
  categoryText: { fontSize: 16, color: "#000", fontFamily },
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
  detailTitle: { fontSize: 16, color: "#000", fontFamily },
  detailInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#000",
    fontFamily,
  },
  saveButton: {
    backgroundColor: "#A00000",
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold", fontFamily },
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
    fontFamily,
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
    fontFamily,
  },
  infoText: {
    fontSize: 14,
    color: "#A00000",
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
    fontFamily,
  },
});

export default EditProductScreen;
