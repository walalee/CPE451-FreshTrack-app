// CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

const CategoryScreen = ({ category }) => {
  const [items, setItems] = useState([]);
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'Products'),
          where('category', '==', category),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(data);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [category, userId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>หมดอายุ: {item.expirationDate}</Text>
        <Text>ที่เก็บ: {item.location}</Text>
        <Text>จำนวน: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>ไม่มีสินค้าในหมวดนี้</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  itemContainer: { flexDirection: 'row', marginBottom: 15 },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' }
});

export default CategoryScreen;
