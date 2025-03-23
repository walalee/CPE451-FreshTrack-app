import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ShoppingNotesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim().length === 0) return;
    setMessages([{ type: "text", content: text }, ...messages]);
    setText("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([
        { type: "image", content: result.assets[0].uri },
        ...messages,
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* วงกลมและปุ่มย้อนกลับ */}
      <View style={styles.whiteCircle}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
          <Text style={styles.title}>โน้ตฝากซื้อของ</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <View style={styles.userLabel}>
              <Text style={styles.userLabelText}>User</Text>
            </View>
            <View style={styles.messageContent}>
              {msg.type === "text" ? (
                <Text style={styles.messageText}>{msg.content}</Text>
              ) : (
                <Image
                  source={{ uri: msg.content }}
                  style={styles.messageImage}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ช่องพิมพ์ข้อความ */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconBox}>
          <Ionicons name="image-outline" size={24} color="black" />
        </TouchableOpacity>
        
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="พิมพ์ข้อความ..."
            value={text}
            onChangeText={setText}
            style={styles.textInput}
          />
        </View>
        
        <TouchableOpacity onPress={handleSend} style={styles.iconBox}>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9D0300",
    padding: 15,
    paddingTop: 50,
    alignItems: "center",
  },
  whiteCircle: {
    width: 450,
    height: 200,
    backgroundColor: "white",
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    position: "center",
    top: -70,
    paddingLeft: 30,
    paddingTop: 60,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  messagesContainer: {
    flex: 1,
    width: "100%",
    marginTop: -170,
  },
  messageBubble: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 10,
  },
  userLabel: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  userLabelText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  messageContent: {
    padding: 15,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    fontSize: 16,
    textAlign: "left",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
});

export default ShoppingNotesScreen;
