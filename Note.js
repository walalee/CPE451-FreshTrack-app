import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ShoppingNotesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]); // เก็บข้อความที่ส่ง
  const [text, setText] = useState(""); // เก็บข้อความที่พิมพ์

  // ฟังก์ชันกดส่งข้อความ
  const handleSend = () => {
    if (text.trim().length === 0) return; // กันไม่ให้ส่งข้อความว่าง
    setMessages([...messages, { type: "text", content: text }]); // เพิ่มข้อความไปใน array
    setText(""); // เคลียร์ช่องพิมพ์
  };

  // ฟังก์ชันเลือกรูปภาพจากแกลเลอรี
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { type: "image", content: result.assets[0].uri }]); // บันทึก URI ของรูป
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", padding: 15 }}>
      {/* หัวข้อ + ปุ่มย้อนกลับ */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10,margin: 20}}>โน้ตฝากซื้อของ</Text>
      </View>

      {/* กล่องแสดงข้อความที่พิมพ์ */}
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#FFF",
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              borderWidth: 1,
              borderColor: "#FFA500", // ขอบสีส้ม
            }}
          >
            {/* ส่วนชื่อผู้ใช้ที่เป็นสีส้ม */}
            <View
              style={{
                backgroundColor: "#FFA500",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "#FFF", fontWeight: "bold" }}>ผู้ใช้</Text>
            </View>

            {/* ส่วนข้อความหรือรูปภาพ */}
            <View style={{ padding: 10 }}>
              {msg.type === "text" ? (
                <Text style={{ fontSize: 14, color: "#000" }}>{msg.content}</Text>
              ) : (
                <Image
                  source={{ uri: msg.content }}
                  style={{ width: "100%", height: 150, borderRadius: 10 }}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ช่องพิมพ์ข้อความ + ปุ่มเพิ่มรูปภาพ + ปุ่มส่ง */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#EEE",
          borderRadius: 30,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
          <Ionicons name="image" size={24} color="gray" />
        </TouchableOpacity>

        <TextInput
          placeholder="พิมพ์ข้อความ..."
          value={text}
          onChangeText={setText}
          style={{ flex: 1, paddingHorizontal: 15 }}
        />

        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="paper-plane" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingNotesScreen;
