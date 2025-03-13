import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

const UnitConverter = ({ navigation }) => {
  const [unitType, setUnitType] = useState("weight");
  const [inputValue, setInputValue] = useState("");
  const [selectedUnit1, setSelectedUnit1] = useState("kg");
  const [selectedUnit2, setSelectedUnit2] = useState("g");

  const weightUnits = {
    kg: { label: "กิโลกรัม", factor: { g: 1000 } },
    g: { label: "กรัม", factor: { kg: 0.001 } },
    mg: { label: "มิลลิกรัม", factor: { g: 0.001 } },
    µg: { label: "ไมโครกรัม", factor: { mg: 0.001 } },
    ct: { label: "กะรัต", factor: { g: 0.2 } },
    t: { label: "ตัน", factor: { kg: 1000 } },
    lb: { label: "ปอนด์", factor: { kg: 0.453592 } },
    oz: { label: "ออนซ์", factor: { g: 28.3495 } },
    dr: { label: "ดรัม", factor: { g: 1.77185 } },
  };

  const volumeUnits = {
    ml: { label: "มิลลิลิตร", factor: { l: 0.001 } },
    l: { label: "ลิตร", factor: { ml: 1000 } },
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* ปุ่มย้อนกลับ */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
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
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabs: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  tab: { padding: 10, flex: 1, alignItems: "center", backgroundColor: "#ddd", borderRadius: 10, margin: 5 },
  activeTab: { backgroundColor: "#D9291A" },
  tabText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  activeTabText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    padding: 30,
    height: 140,
  },
  picker: { flex: 2 },
  input: { flex: 2, fontSize: 18, textAlign: "right", paddingRight: 10 },
  unitLabel: { fontSize: 16, fontWeight: "bold" },
  swapButton: { alignSelf: "center", marginVertical: 5 },
  numpad: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 20 },
  numButton: {
    width: "22%",
    padding: 15,
    alignItems: "center",
    margin: 5,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  numText: { fontSize: 24, fontWeight: "bold" },
});

export default UnitConverter;
