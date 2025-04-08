import React from 'react';
<<<<<<< HEAD
import CategoryScreen from './CategoryScreen';
export default () => <CategoryScreen category="ยาและเวชภัณฑ์" />;
=======


const medicalProducts = [
  { id: '1', name: 'Face Mask', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Hand Sanitizer', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Gloves', image: 'https://via.placeholder.com/100' },
];

const MedicalScreen = () => <CategoryScreen category="Medical Supplies" products={medicalProducts} />;

export default MedicalScreen;
>>>>>>> f559e92e7f9cf193517c0f2c81b470b2e85a1e0b
