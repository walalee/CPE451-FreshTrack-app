import React from 'react';
<<<<<<< HEAD
import CategoryScreen from './CategoryScreen';
export default () => <CategoryScreen category="อาหารสัตว์" />;
=======


const petFoodProducts = [
  { id: '1', name: 'Dog Food', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Cat Food', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Bird Food', image: 'https://via.placeholder.com/100' },
];

const PetfoodScreen = () => <CategoryScreen category="Pet Food" products={petFoodProducts} />;

export default PetfoodScreen;
>>>>>>> f559e92e7f9cf193517c0f2c81b470b2e85a1e0b
