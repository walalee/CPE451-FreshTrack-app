import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';

import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

const FilterScreen = ({ visible, onClose, onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const slideAnim = useState(new Animated.Value(width))[0]; // ⬅ เริ่มนอกจอด้านซ้าย

  const [fontsLoaded] = useFonts({
    'PromptMedium': require('../assets/Prompt-Medium.ttf'),
    'PromptLight': require('../assets/Prompt-Light.ttf'),
  });
  

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded) return null;

  const filterOptions = [
    'ใกล้หมดอายุ',
    'หมดอายุใน 1 เดือน',
    'ยังเก็บได้นาน',
    'เรียงตามการเพิ่มสินค้าครั้งล่าสุด',
  ];

  const toggleFilter = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option]
    );
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.fullscreen}>
        {/* พื้นหลังเทาโปร่ง */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* กล่องกรองเลื่อนจากซ้าย */}
        <Animated.View style={[styles.content, { right: slideAnim }]}>
          <Text style={[styles.header, { fontFamily: 'PromptMedium' }]}>
            ค้นหาแบบละเอียด
          </Text>

          <View style={styles.filterGroup}>
            {filterOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterOption,
                  selectedFilters.includes(option) && styles.filterOptionActive,
                ]}
                onPress={() => toggleFilter(option)}
              >
                <Text
                  style={{
                    color: selectedFilters.includes(option) ? '#fff' : '#333',
                    fontFamily: 'PromptLight',
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetText}>ล้าง</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onApply(selectedFilters)}
            >
              <Text style={styles.applyText}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1000,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: '#960000',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 250,
  },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#960000',
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#960000',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#960000',
    fontWeight: 'bold',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterScreen;
