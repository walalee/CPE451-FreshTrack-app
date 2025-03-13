// import React และ React Native components ที่จะใช้
import React, { useState } from "react"; // useState ใช้สำหรับการจัดการสถานะ
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"; // คอมโพเนนต์จาก React Native
import * as ImagePicker from "expo-image-picker"; // ใช้สำหรับเลือกภาพจากไลบรารีของเครื่อง
import { Ionicons } from "@expo/vector-icons"; // ใช้เพื่อแสดงไอคอนจาก Ionicons

// สร้างฟังก์ชัน ProductForm ซึ่งจะเป็นคอมโพเนนต์หลักในหน้าฟอร์มสินค้า
const ProductForm = () => {
  // การใช้ useState สำหรับการจัดการสถานะของภาพและชื่อสินค้า
  const [image, setImage] = useState(null); // สถานะสำหรับเก็บ URI ของภาพที่เลือก
  const [productName, setProductName] = useState(""); // สถานะสำหรับเก็บชื่อสินค้าที่กรอก

  // ฟังก์ชันสำหรับเปิดไลบรารีภาพ และให้ผู้ใช้เลือกภาพ
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // จำกัดการเลือกเฉพาะภาพ
      allowsEditing: true, // อนุญาตให้แก้ไขภาพ
      aspect: [4, 3], // อัตราส่วนของภาพที่เลือก
      quality: 1, // ความละเอียดสูงสุด
    });

    if (!result.canceled) { // ถ้าผู้ใช้ไม่ยกเลิก
      setImage(result.assets[0].uri); // อัพเดทสถานะของภาพที่เลือก
    }
  };

  // ส่วนของ UI (ส่วนแสดงผลในหน้าจอ)
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* Header: แสดงปุ่มย้อนกลับและข้อความ "แก้ไขข้อมูลสินค้า" */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color="black" /> {/* ปุ่มย้อนกลับ */}
        <Text style={{ fontSize: 18, marginLeft: 10 }}>แก้ไขข้อมูลสินค้า</Text> {/* ข้อความหัวข้อ */}
      </View>

      {/* Product Image and Name Section: แสดงภาพสินค้าและช่องกรอกชื่อสินค้า */}
      <View style={styles.contentRow}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} /> // ถ้ามีภาพให้แสดงภาพ
          ) : (
            <Ionicons name="camera" size={40} color="#999" /> // ถ้าไม่มีภาพให้แสดงไอคอนกล้อง
          )}
        </TouchableOpacity>
        <View style={styles.inputGroup}>
          <Text>ชื่อสินค้า :</Text> {/* ป้ายชื่อสินค้า */}
          <TextInput 
            style={styles.input} 
            placeholder="กรอกชื่อสินค้า" // ข้อความบอกให้กรอกชื่อสินค้า
            value={productName} // ค่าในช่องกรอกคือชื่อสินค้าปัจจุบัน
            onChangeText={setProductName} // เมื่อกรอกข้อความจะอัพเดทค่าใน productName
          />
        </View>
      </View>

      {/* Input Fields: ส่วนกรอกข้อมูลอื่นๆ เช่น วันหมดอายุ, หมวดหมู่, และสถานที่ */}
      <View style={styles.inputGroup}>
        <Text>วันหมดอายุ :</Text>
        <TextInput style={styles.input} placeholder="กรอกวันหมดอายุ" /> {/* ช่องกรอกวันหมดอายุ */}

        <Text>หมวดหมู่ :</Text>
        <TextInput style={styles.input} placeholder="กรอกหมวดหมู่" /> {/* ช่องกรอกหมวดหมู่ */}

        <Text>สถานที่ :</Text>
        <TextInput style={styles.input} placeholder="กรอกสถานที่" /> {/* ช่องกรอกสถานที่ */}
      </View>

      {/* Info Icon: ปุ่มสำหรับแสดงข้อมูลเพิ่มเติม */}
      <TouchableOpacity style={styles.infoButton}>
        <Ionicons name="information-circle" size={24} color="#999" /> {/* ไอคอนข้อมูล */}
      </TouchableOpacity>

      {/* Save Button: ปุ่มสำหรับบันทึกข้อมูลสินค้า */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Save Product</Text> {/* ข้อความในปุ่มบันทึก */}
      </TouchableOpacity>
    </View>
  );
};

// สไตล์ของคอมโพเนนต์ต่างๆ
const styles = {
  imageContainer: {
    width: 100,
    height: 80,
    backgroundColor: "#f0f0f0", // สีพื้นหลังของพื้นที่สำหรับเลือกภาพ
    alignItems: "center", // จัดตำแหน่งไอคอนให้ตรงกลาง
    justifyContent: "center", // จัดตำแหน่งไอคอนให้ตรงกลาง
    borderRadius: 8, // มุมโค้ง
    marginRight: 10, // ช่องว่างด้านขวาของ container
  },
  image: {
    width: "100%", // ความกว้างเต็มที่
    height: "100%", // ความสูงเต็มที่
    resizeMode: "cover", // รูปจะถูกครอบให้เต็มพื้นที่
    borderRadius: 8, // มุมโค้ง
  },
  inputGroup: {
    flex: 1,
  },
  contentRow: {
    flexDirection: "row", // แสดงเป็นแถว (แนวนอน)
    alignItems: "center", // จัดตำแหน่งเนื้อหาให้ตรงกลางแนวตั้ง
    marginBottom: 15, // ช่องว่างด้านล่าง
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc", // สีขอบของช่องกรอก
    borderRadius: 5, // มุมโค้งของช่องกรอก
    marginBottom: 10, // ช่องว่างด้านล่างของช่องกรอก
    paddingHorizontal: 10, // ช่องว่างข้างในช่องกรอก
  },
  infoButton: {
    alignSelf: "flex-start", // จัดตำแหน่งปุ่มไปทางซ้าย
    marginBottom: 20, // ช่องว่างด้านล่างของปุ่ม
  },
  saveButton: {
    backgroundColor: "#D32F2F", // สีพื้นหลังของปุ่มบันทึก
    borderRadius: 5, // มุมโค้ง
    alignItems: "center", // จัดตำแหน่งข้อความในปุ่มให้อยู่ตรงกลาง
    padding: 10, // ช่องว่างภายในปุ่ม
  },
};

// ส่งออกคอมโพเนนต์ ProductForm
export default ProductForm;
