import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Clipboard, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfile() {
  const [friendId, setFriendId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const userId = "user12345678";

  const copyToClipboard = () => {
    Clipboard.setString(userId);
    Alert.alert("คัดลอกแล้ว", "ID ถูกคัดลอกไปยังคลิปบอร์ดแล้ว");
  };

  const addFriend = () => {
    if (friendId.trim()) {
      Alert.alert("เพิ่มเพื่อนสำเร็จ", `เพิ่มเพื่อนด้วย ID: ${friendId}`);
      setFriendId('');
      setModalVisible(false);
    } else {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่ ID ผู้ใช้ก่อนเพิ่มเพื่อน");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>โปรไฟล์ผู้ใช้</Text>
      </View>
      <View style={styles.profileIconContainer}>
        <View style={styles.profileIcon}>
          <Ionicons name="person-outline" size={40} color="#fff" />
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>ID :</Text>
        <TextInput style={styles.userId} value={userId} editable={false} />
        <TouchableOpacity onPress={copyToClipboard}>
          <Ionicons name="copy" size={15} color="gray" style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>เพิ่มเพื่อน</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="ใส่ ID ผู้ใช้"
              value={friendId}
              onChangeText={setFriendId}
            />
            <View style={styles.modalButtons}>
              <Button title="ย้อนกลับ" onPress={() => setModalVisible(false)} color="red" />
              <Button title="เพิ่มเพื่อน" onPress={addFriend} color="green" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50, // ไม่ให้ชิดกับ Status Bar
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginLeft: 5,
  },
  profileIconContainer: {
    marginBottom: 25,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9D0300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 70,
  },
  label: {
    fontSize: 16,
  },
  userId: {
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#eee',
    minWidth: 100,
  },
  copyIcon: {
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#9f0300',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    top: 150
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
