import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";

// คอมโพเนนต์หลักของหน้าจอแนะนำการเก็บวัตถุดิบ
const StorageGuideScreen = ({ navigation }) => {
  // หัวตาราง
  const tableHead = ["วัตถุดิบ", "แช่เย็น (2-4°C)", "แช่แข็ง (-18°C หรือต่ำกว่า)"];

  // ข้อมูลในตารางแต่ละแถว
  const tableData = [
    ["ปลา", "1-2 วัน", "3-6 เดือน"],
    ["กุ้ง", "1-2 วัน", "4-6 เดือน"],
    ["ปู", "1-2 วัน", "4-6 เดือน"],
    ["หอย", "1-2 วัน", "3-4 เดือน"],
    ["ปลาหมึก", "1-2 วัน", "3-6 เดือน"],
    ["เนื้อไก่", "1-2 วัน", "9-12 เดือน"],
    ["เนื้อเป็ด", "1-2 วัน", "6-12 เดือน"],
    ["เนื้อวัว", "3-5 วัน", "4-12 เดือน"],
    ["เนื้อหมู", "3-5 วัน", "4-12 เดือน"],
    ["ผักกินใบ", "3-7 วัน", "8-12 เดือน"],
    ["ผักกินหัว", "1-3 สัปดาห์", "8-12 เดือน"],
    ["ผลไม้", "3-7 วัน", "8-12 เดือน"]
  ];

  return (
    <View style={styles.container}>
      {/* พื้นหลังแบบวงกลมเพื่อความสวยงาม */}
      <View style={styles.backgroundContainer}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
      </View>

      {/* ส่วนของเนื้อหาหลัก */}
      <View style={styles.contentContainer}>

        {/* แถบด้านบน พร้อมปุ่มย้อนกลับ */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#000" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ตารางแนะนำของสด</Text>
        </View>

        {/* ตารางข้อมูลวัตถุดิบ */}
        <ScrollView>
          <View style={styles.tableWrapper}>
            <View style={styles.tableContainer}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#9D0300" }} style={styles.table}>
                {/* แสดงหัวตาราง */}
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                {/* แสดงข้อมูลแต่ละแถว */}
                <Rows data={tableData} textStyle={styles.text} />
              </Table>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// สไตล์ทั้งหมดของหน้าจอนี้
const styles = StyleSheet.create({
  // คอนเทนเนอร์หลักของหน้า
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // ================= วงกลมพื้นหลังตกแต่ง =================
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject, // ให้เต็มหน้าจอ
    zIndex: -1, // อยู่ข้างหลังทุกอย่าง
  },
  circleTop: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#9D0300",
    top: 150, // จากบนลงมา 150
    left: -100, // ออกมานอกซ้ายเล็กน้อย
  },
  circleBottom: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#9D0300",
    bottom: 60, // ขึ้นจากล่างมา 60
    right: -70, // ออกนอกขวาเล็กน้อย
  },

  // ================= ส่วนเนื้อหาหลัก =================
  contentContainer: {
    flex: 1,
    zIndex: 1, // อยู่ข้างหน้าวงกลม
    paddingTop: 60, // ขยับทุกอย่างลง
  },

  // ================= Header =================
  header: {
    flexDirection: "row", // แนวนอน
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // เส้นใต้
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // เว้นจากไอคอน
  },

  // ================= ตาราง =================
  tableWrapper: {
    padding: 16,
    marginTop: 22,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // เงาใน Android
  },
  table: {
    backgroundColor: "#fff",
  },
  head: {
    height: 50,
    backgroundColor: "#9D0300", // สีแดงเข้ม
  },
  headText: {
    margin: 6,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    margin: 6,
    textAlign: "center",
    fontSize: 16,
  },
});

// ส่งออกคอมโพเนนต์เพื่อใช้งาน
export default StorageGuideScreen;
