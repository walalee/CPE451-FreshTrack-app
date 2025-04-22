import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

const ProfileScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState("ชื่อเล่นของคุณ");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userId = "user12345678"; // mock user ID

const [fontsLoaded] = useFonts({
    PromptRegular: require('../assets/Prompt-Regular.ttf'),
    PromptLight: require('../assets/Prompt-Light.ttf'),
    PromptBold: require('../assets/Prompt-Bold.ttf'),
    PromptMedium: require('../assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const copyToClipboard = () => {
    Clipboard.setString(userId);
    Alert.alert("คัดลอกแล้ว", "ID ถูกคัดลอกไปยังคลิปบอร์ด");
  };

  return (
    <View style={styles.container}>
      {/* ปุ่มย้อนกลับและหัวข้อ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>โปรไฟล์ผู้ใช้</Text>
      </View>

      {/* Icon โปรไฟล์ */}
      <View style={styles.profileIconContainer}>
        <Ionicons
          name="person-outline"
          size={64}
          color="white"
          style={styles.profileIcon}
        />
      </View>

      {/* user ID + ปุ่มก็อป */}
      <View style={styles.userIdContainer}>
        <Text style={styles.userIdLabel}>ID :</Text>
        <Text style={styles.userId}>{userId}</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Ionicons
            name="copy-outline"
            size={18}
            color="#888"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>

      {/* ชื่อเล่น */}
      <Text style={styles.label}>ชื่อเล่น</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          editable={isEditing}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name="pencil-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Email */}
      <Text style={styles.label}>E-mail</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="your@email.com"
          style={styles.input}
          editable={false}
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="********"
          secureTextEntry
          style={styles.input}
          editable={false}
        />
      </View>

      {/* ปุ่มเพิ่มเพื่อน */}
      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>เพิ่มเพื่อน</Text>
      </TouchableOpacity>

      {/* Modal กรอก ID เพื่อน */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <Pressable
            style={styles.slideUpModal}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalText}>กรอก ID เพื่อนของคุณเพื่อเพิ่มเพื่อน</Text>
            <TextInput style={styles.modalInput} placeholder="Friend's ID" />
            <TouchableOpacity style={styles.button} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>เพิ่มเพื่อน</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    fontFamily: "PromptRegular",
    marginLeft: 10,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    backgroundColor: "#990000",
    borderRadius: 50,
    padding: 20,
  },
  userIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  userIdLabel: {
    fontFamily: "PromptRegular",
    color: "#555",
  },
  userId: {
    marginHorizontal: 5,
    fontFamily: "PromptRegular",
    color: "#555",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "PromptMedium",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PromptLight",
    color: "#000",
  },
  button: {
    backgroundColor: "#990000",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 45,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PromptMedium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  slideUpModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "PromptRegular",
    marginBottom: 50,
  },
  modalInput: {
    backgroundColor: "#e0e0e0",
    width: "80%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});

export default ProfileScreen;
