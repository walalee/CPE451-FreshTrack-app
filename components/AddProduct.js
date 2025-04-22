import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import { useFonts } from "expo-font";

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("หมวดหมู่");
  const [expiryDate, setExpiryDate] = useState("00/00/00");
  const [storageLocation, setStorageLocation] = useState("ช่องฟรีซตู้นี้");
  const [image, setImage] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    PromptRegular: require("../assets/Prompt-Regular.ttf"),
    PromptLight: require("../assets/Prompt-Light.ttf"),
    PromptBold: require("../assets/Prompt-Bold.ttf"),
    PromptMedium: require("../assets/Prompt-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
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
            <Text style={styles.detailValue}>{expiryDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>สถานที่เก็บ</Text>
            <Text style={styles.detailValue}>{storageLocation}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("FreshFoodTable")}>
          <Text style={styles.storageGuide}>
            ดูตารางแนะนำการเก็บอาหารสด คลิก
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        isVisible={isCategoryModalVisible}
        onBackdropPress={() => setCategoryModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalItem}
              onPress={() => {
                setSelectedCategory(category);
                setCategoryModalVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },

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
    fontFamily: "PromptBold",
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "PromptMedium",
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

  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "PromptRegular",
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

  detailValue: {
    fontSize: 16,
    color: "#888",
    fontFamily: "PromptLight",
  },

  storageGuide: {
    fontSize: 16,
    color: "#A00000",
    textAlign: "center",
    marginBottom: 15,
    textDecorationLine: "underline",
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

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  modalContent: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },

  modalItem: {
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },

  modalItemText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PromptRegular",
    textAlign: "center",
  },
});

export default AddProductScreen;
