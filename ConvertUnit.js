import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const WeightConverter = () => {
  const [kg, setKg] = useState('');
  const [lbs, setLbs] = useState('');

  const convertKgToLbs = (value) => {
    setKg(value);
    setLbs(value ? (parseFloat(value) * 2.20462).toFixed(2) : '');
  };

  const convertLbsToKg = (value) => {
    setLbs(value);
    setKg(value ? (parseFloat(value) / 2.20462).toFixed(2) : '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kilograms (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kg}
        onChangeText={convertKgToLbs}
        placeholder="Enter kg"
      />

      <Text style={styles.label}>Pounds (lbs):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={lbs}
        onChangeText={convertLbsToKg}
        placeholder="Enter lbs"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default WeightConverter;