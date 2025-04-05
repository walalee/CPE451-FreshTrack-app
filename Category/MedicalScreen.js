import React from 'react';


const medicalProducts = [
  { id: '1', name: 'Face Mask', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Hand Sanitizer', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Gloves', image: 'https://via.placeholder.com/100' },
];

const MedicalScreen = () => <CategoryScreen category="Medical Supplies" products={medicalProducts} />;

export default MedicalScreen;
