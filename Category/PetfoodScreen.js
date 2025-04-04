import React from 'react';
import CategoryScreen from './CategoryScreen';

const petFoodProducts = [
  { id: '1', name: 'Dog Food', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Cat Food', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Bird Food', image: 'https://via.placeholder.com/100' },
];

const PetfoodScreen = () => <CategoryScreen category="Pet Food" products={petFoodProducts} />;

export default PetfoodScreen;
