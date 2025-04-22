// ProductCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

// ฟังก์ชันคำนวณสถานะตามหมวดหมู่
const getStatusColor = (expirationDate, category) => {
  const today = moment();
  const exp = moment(expirationDate, "YYYY-MM-DD");
  const diffDays = exp.diff(today, 'days');

  const thresholds = {
    "อาหารสด": { near: 2, expired: 0 },
    "ผลไม้และผัก": { near: 3, expired: 0 },
    "ยาและอุปกรณ์ทางการแพทย์": { near: 180, expired: 0 },
    "อาหารแปรรูป": { near: 90, expired: 0 },
    "ผลิตภัณฑ์เคมี": { near: 180, expired: 0 },
    "อาหารสัตว์เลี้ยง": { near: 60, expired: 0 },
    "ผลิตภัณฑ์ดูแลร่างกาย": { near: 180, expired: 0 },
  };

  const { near, expired } = thresholds[category] || { near: 3, expired: 0 };

  if (diffDays < expired) return "#FF6B6B";       // แดง
  else if (diffDays <= near) return "#FFD93D";    // เหลือง
  else return "#6BCB77";                          // เขียว
};

const ProductCard = ({ product, onPress }) => {
  const daysLeft = moment(product.expirationDate).diff(moment(), 'days');
  const statusColor = getStatusColor(product.expirationDate, product.category);

  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={styles.daysLeft}>{daysLeft} วัน ต่อจากนี้</Text>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <Image source={{ uri: product.imageUrl }} style={styles.image} />

        <View style={styles.details}>
          <Text>วันหมดอายุ : {moment(product.expirationDate).format("DD / MM / YYYY")}</Text>
          <Text>ชื่อสินค้า : {product.name}</Text>
          <Text>หมวดหมู่ : {product.category}</Text>
          <Text>สถานที่ : {product.location}</Text>
          <Text>จำนวน : {product.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  daysLeft: {
    fontWeight: 'bold',
    color: '#444'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    color: '#333'
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginVertical: 10,
  },
  details: {
    gap: 4,
  }
});

export default ProductCard;