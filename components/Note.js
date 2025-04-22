import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

const App = ({ navigation }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);

const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'),
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  // ฟังก์ชันเลือกภาพ
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // ฟังก์ชันส่งข้อความ
  const sendMessage = () => {
    if (text.trim() !== "") {
      const newMessage = {
        text,
        timestamp: new Date(), // เก็บเวลาส่งข้อความ
      };
      setMessages([...messages, newMessage]);
      setText("");
    }
  };

  // ฟังก์ชันคำนวณเวลาที่ข้อความถูกส่งไปแล้ว
  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} วันที่ผ่านมา`;
    if (diffHours > 0) return `${diffHours} ชั่วโมงที่ผ่านมา`;
    return `${diffMinutes} นาทีที่ผ่านมา`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
          <Text style={styles.headerText}>โน้ตฝากซื้อของ</Text>
        </TouchableOpacity>
      </View>

      {/* วงกลมพื้นหลัง */}
      <View style={styles.circle} />

      {/* แสดงข้อความที่ส่งแล้ว */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageBubble}>
            {/* ส่วนหัวสีดำ */}
            <View style={styles.messageHeader}>
              <Text style={styles.userText}>User</Text>
            </View>

            {/* ข้อความ */}
            <View style={styles.messageBody}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>

            {/* เวลาส่งข้อความ */}
            <View style={styles.timestampContainer}>
              <Text style={styles.timestampText}>{timeAgo(message.timestamp)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ช่องพิมข้อความ */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="พิมข้อความ..."
      />

      {/* ปุ่มเลือกภาพ */}
      <TouchableOpacity style={styles.box1} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={30} color="black" />
        )}
      </TouchableOpacity>

      {/* ปุ่มส่งข้อความ */}
      <TouchableOpacity style={styles.box2} onPress={sendMessage}>
        <Ionicons name="paper-plane-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9D0300",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    left: -10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "PromptRegular",
    color: "black",
    marginLeft: 5,
  },
  circle: {
    width: 466,
    height: 477,
    borderRadius: 250,
    backgroundColor: "white",
    bottom: 400,
  },
  messagesContainer: {
    position: "absolute",
    top: 100,
    width: "98%",
    maxHeight: "50%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  messageBubble: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  messageHeader: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  userText: {
    color: "white",
    fontFamily: "PromptMedium",
  },
  messageBody: {
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    fontFamily: "PromptLight",
    color: "#000",
  },
  timestampContainer: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: "PromptRegular",
    color: "#757575",
  },
  input: {
    width: 280,
    height: 45,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "PromptLight",
    backgroundColor: "#fff",
    top: 190,
  },
  box1: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    top: 145,
    right: 172,
    justifyContent: "center",
    alignItems: "center",
  },
  box2: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    top: 100,
    left: 172,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});
