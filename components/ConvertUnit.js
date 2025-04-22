import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

const DropdownModal = ({ visible, onClose, onSelect, options }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { onSelect(item); onClose(); }} style={styles.option}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const UnitConverter = ({ navigation }) => {
  const [unitType, setUnitType] = useState("weight");
  const [inputValue, setInputValue] = useState("");
  const [selectedUnit1, setSelectedUnit1] = useState("kg");
  const [selectedUnit2, setSelectedUnit2] = useState("g");

  const weightUnits = {
    kg: { label: "กิโลกรัม", factor: { g: 1000, mg: 1e6, µg: 1e9, ct: 5000, t: 1e-3, lb: 2.20462, oz: 35.274, dr: 564.383, dg: 10 } },
    g: { label: "กรัม", factor: { kg: 0.001, mg: 1000, µg: 1e3, ct: 5, t: 1e-6, lb: 0.00220462, oz: 0.035274, dr: 0.564383, dg: 0.1 } },
    mg: { label: "มิลลิกรัม", factor: { g: 0.001, kg: 1e-6, µg: 1000, ct: 5e-3, t: 1e-9, lb: 2.2046e-6, oz: 3.5274e-5, dr: 5.64383e-4, dg: 1e-4 } },
    µg: { label: "ไมโครกรัม", factor: { mg: 0.001, g: 1e-3, kg: 1e-6, ct: 5e-4, t: 1e-12, lb: 2.2046e-9, oz: 3.5274e-8, dr: 5.64383e-7, dg: 1e-7 } },
    ct: { label: "กะรัต", factor: { g: 0.2, kg: 2e-4, mg: 200, µg: 2e5, t: 2e-7, lb: 4.4092e-4, oz: 0.007054, dr: 0.112868, dg: 2 } },
    t: { label: "ตัน", factor: { kg: 1000, g: 1e6, mg: 1e9, µg: 1e12, ct: 5e6, lb: 2204.62, oz: 35274, dr: 564383, dg: 10000 } },
    lb: { label: "ปอนด์", factor: { kg: 0.453592, g: 453.592, mg: 4.53592e5, µg: 4.53592e8, ct: 2279.6, t: 4.53592e-4, oz: 16, dr: 253.136, dg: 4.53592 } },
    oz: { label: "ออนซ์", factor: { g: 28.3495, kg: 0.0283495, mg: 2.83495e4, µg: 2.83495e7, ct: 141.748, t: 2.83495e-5, lb: 0.0625, dr: 15.832, dg: 0.283495 } },
    dr: { label: "ดรัม", factor: { g: 1.77185, kg: 0.00177185, mg: 1.77185e3, µg: 1.77185e6, ct: 8.85925, t: 1.77185e-6, lb: 0.0039, oz: 0.0625, dg: 0.177185 } },
    dg: { label: "ขีด", factor: { g: 10, kg: 0.01, mg: 1e4, µg: 1e7, ct: 50, t: 1e-4, lb: 0.0220462, oz: 0.35274, dr: 5.64193 } },
  };

  const volumeUnits = {
      ml: { label: "มิลลิลิตร", factor: { l: 0.001, hl: 1e-5, m3: 1e-6, cm3: 1, dl: 0.01, cl: 0.1, dm3: 1e-3, mm3: 1000 } },
      l: { label: "ลิตร", factor: { ml: 1000, hl: 0.01, m3: 0.001, cm3: 1000, dl: 10, cl: 100, dm3: 1, mm3: 1e6 } },
      hl: { label: "เฮกโตลิตร", factor: { ml: 1e5, l: 100, m3: 0.1, cm3: 1e5, dl: 1e3, cl: 1e4, dm3: 100, mm3: 1e8 } },
      m3: { label: "ลูกบาศก์เมตร", factor: { ml: 1e6, l: 1000, hl: 10, cm3: 1e6, dl: 1e4, cl: 1e5, dm3: 1000, mm3: 1e9 } },
      cm3: { label: "ลูกบาศก์เซนติเมตร", factor: { ml: 1, l: 1e-3, hl: 1e-5, m3: 1e-6, dl: 1e-2, cl: 0.1, dm3: 1e-3, mm3: 1000 } },
      dl: { label: "เดซิลิตร", factor: { ml: 100, l: 0.1, hl: 1e-3, m3: 1e-4, cm3: 100, cl: 10, dm3: 0.1, mm3: 1e5 } },
      cl: { label: "เซนติลิตร", factor: { ml: 10, l: 0.01, hl: 1e-4, m3: 1e-5, cm3: 10, dl: 0.1, dm3: 1e-2, mm3: 1e4 } },
      dm3: { label: "ลูกบาศก์เดซิเมตร", factor: { ml: 1e3, l: 1, hl: 1e-2, m3: 1e-3, cm3: 1e3, dl: 10, cl: 100, mm3: 1e6 } },
      mm3: { label: "ลูกบาศก์มิลลิเมตร", factor: { ml: 1e-3, l: 1e-6, hl: 1e-8, m3: 1e-9, cm3: 1e-3, dl: 1e-5, cl: 1e-4, dm3: 1e-6 } }, 
  };

  const unitData = unitType === "weight" ? weightUnits : volumeUnits;
  const unitKeys = Object.keys(unitData);

  const convertValue = () => {
    if (!inputValue) return "";
    const value = parseFloat(inputValue);
    const factor = unitData[selectedUnit1]?.factor[selectedUnit2] || 1;
    return (value * factor).toFixed(2);
  };

  const handleNumpadPress = (value) => {
    if (value === "C") {
      setInputValue("");
    } else if (value === "⌫") {
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + value);
    }
  };

  const swapUnits = () => {
    setSelectedUnit1(selectedUnit2);
    setSelectedUnit2(selectedUnit1);
  };

  const [fontsLoaded] = useFonts({
      PromptRegular: require('../assets/Prompt-Regular.ttf'),
      PromptLight: require('../assets/Prompt-Light.ttf'),
      PromptBold: require('../assets/Prompt-Bold.ttf'),
      PromptMedium: require('../assets/Prompt-Medium.ttf'),
    });
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* ปุ่มย้อนกลับ */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* หัวข้อของหน้า */}
        <Text style={styles.headerTitle}>แปลงหน่วย</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, unitType === "weight" && styles.activeTab]}
          onPress={() => setUnitType("weight")}
        >
          <Text style={[styles.tabText, unitType === "weight" && styles.activeTabText]}>น้ำหนัก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, unitType === "volume" && styles.activeTab]}
          onPress={() => setUnitType("volume")}
        >
          <Text style={[styles.tabText, unitType === "volume" && styles.activeTabText]}>ปริมาตร</Text>
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Picker selectedValue={selectedUnit1} onValueChange={setSelectedUnit1} style={styles.picker}>
          {unitKeys.map((key) => (
            <Picker.Item key={key} label={unitData[key].label} value={key} />
          ))}
        </Picker>
        <TextInput style={styles.input} value={inputValue} editable={false} />
        <Text style={styles.unitLabel}>{selectedUnit1}</Text>
      </View>

      <TouchableOpacity style={styles.swapButton} onPress={swapUnits}>
        <MaterialIcons name="swap-vert" size={30} color="#FFA500" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Picker selectedValue={selectedUnit2} onValueChange={setSelectedUnit2} style={styles.picker}>
          {unitKeys.map((key) => (
            <Picker.Item key={key} label={unitData[key].label} value={key} />
          ))}
        </Picker>
        <TextInput style={styles.input} value={convertValue()} editable={false} />
        <Text style={styles.unitLabel}>{selectedUnit2}</Text>
      </View>

      {/* Numpad */}
      <View style={styles.numpad}>
        {["7", "8", "9", "C"].map((key) => (
          <TouchableOpacity key={key} style={styles.numButton} onPress={() => handleNumpadPress(key)}>
            <Text style={styles.numText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {["4", "5", "6", "⌫"].map((key) => (
          <TouchableOpacity key={key} style={styles.numButton} onPress={() => handleNumpadPress(key)}>
            <Text style={styles.numText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {["1", "2", "3"].map((key) => (
          <TouchableOpacity key={key} style={styles.numButton} onPress={() => handleNumpadPress(key)}>
            <Text style={styles.numText}>{key}</Text>
          </TouchableOpacity>
        ))}
        {["00", "0", "."].map((key) => (
          <TouchableOpacity key={key} style={styles.numButton} onPress={() => handleNumpadPress(key)}>
            <Text style={styles.numText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 15,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "PromptRegular",
  },
  tabs: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  tab: { padding: 10, flex: 1, alignItems: "center", backgroundColor: "#ddd", borderRadius: 10, margin: 5 },
  activeTab: { backgroundColor: "#D9291A" },
  tabText: { fontSize: 18, fontFamily: "PromptRegular", color: "#333" },
  activeTabText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    height: 120,
  },
  picker: { flex: 2 },
  input: { flex: 2, fontSize: 20, textAlign: "right", paddingRight: 10 },
  unitLabel: { fontSize: 20, fontFamily: "PromptRegular" },
  swapButton: { alignSelf: "center", marginVertical: 5 },
  numpad: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 30 },
  numButton: {
    width: "22%",
    padding: 15,
    alignItems: "center",
    margin: 5,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  numText: { fontSize: 24, fontFamily: "PromptRegular", },
});

export default UnitConverter;
