import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const EditProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState(""); // ชื่อสินค้า
  const [selectedCategory, setSelectedCategory] = useState("หมวดหมู่"); // หมวดหมู่สินค้า
  const [expiryDate, setExpiryDate] = useState("00/00/00"); // วันที่หมดอายุ
  const [storageLocation, setStorageLocation] = useState("ช่องฟรีซตู้นี้"); // สถานที่เก็บสินค้า
  const [image, setImage] = useState(null); // รูปภาพสินค้า

  // ฟังก์ชันสำหรับเลือกภาพจากแกลเลอรี
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" color="#A00000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>แก้ไขข้อมูลสินค้า</Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>รูปภาพสินค้า</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            {image ? 
              <Image source={{ uri: image }} style={styles.image} /> : 
              <Icon name="camera-alt" type="material" color="#888" size={32} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanIcon}>
            <Icon name="qr-code-scanner" type="material" color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="ชื่อสินค้า" value={productName} onChangeText={setProductName} />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>หมวดหมู่</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="หมวดหมู่" value="หมวดหมู่" />
          </Picker>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailLabel}>รายละเอียด</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>วันหมดอายุ</Text>
            <TextInput style={styles.detailInput} value={expiryDate} onChangeText={setExpiryDate} />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>สถานที่เก็บ</Text>
            <TextInput style={styles.detailInput} value={storageLocation} onChangeText={setStorageLocation} />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 20 }, // เพิ่ม paddingTop ที่นี่
  header: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd", marginTop: 20 }, // เพิ่ม marginTop สำหรับ header
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  content: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  imageContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  imagePlaceholder: { width: 100, height: 100, backgroundColor: "#E0E0E0", borderRadius: 8, justifyContent: "center", alignItems: "center", alignSelf: "flex-start" },
  scanIcon: { marginLeft: 200, backgroundColor: "#A00000", borderRadius: 70, padding: 7, marginTop: 58 },
  input: { backgroundColor: "#fff", borderRadius: 5, padding: 14, fontSize: 16, marginBottom: 15 },
  pickerContainer: { backgroundColor: "#fff", borderRadius: 5, marginBottom: 15, paddingHorizontal: 10 },
  pickerLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 15, color: "#333" },
  picker: { height: 50, width: "100%" },
  detailContainer: { backgroundColor: "#fff", padding: 14, borderRadius: 5, marginBottom: 20 },
  detailLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  detailTitle: { fontSize: 16, color: "#000" },
  detailInput: { backgroundColor: "#fff", padding: 10, borderRadius: 5, width: "-50%" },
  saveButton: { backgroundColor: "#A00000", borderRadius: 20, padding: 14, alignItems: "center" },
  saveButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});

export default EditProductScreen;
