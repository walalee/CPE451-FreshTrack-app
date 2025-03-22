import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ShoppingNotesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim().length === 0) return;
    setMessages([...messages, { type: "text", content: text }]);
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
      setMessages([...messages, { type: "image", content: result.assets[0].uri }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>โน้ตฝากซื้อของ</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <View style={styles.userLabel}>
              <Text style={styles.userLabelText}>ผู้ใช้</Text>
            </View>
            <View style={styles.messageContent}>
              {msg.type === "text" ? (
                <Text style={styles.messageText}>{msg.content}</Text>
              ) : (
                <Image source={{ uri: msg.content }} style={styles.messageImage} />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <Ionicons name="image-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          placeholder="พิมพ์ข้อความ..."
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
  },
  userLabel: {
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  userLabelText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  messageContent: {
    padding: 10,
  },
  messageText: {
    fontSize: 14,
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
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  imageButton: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#FF0000",
    borderRadius: 20,
    padding: 10,
  },
});

export default ShoppingNotesScreen;