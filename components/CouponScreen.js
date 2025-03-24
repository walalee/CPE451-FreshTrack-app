import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CouponsScreen = ({ route }) => {
  const { brand } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>คูปองจาก {brand}</Text>
      {/* แสดงคูปองของแต่ละแบรนด์ที่นี่ */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CouponsScreen;
