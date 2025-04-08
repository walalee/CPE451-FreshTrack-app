import React from 'react';
<<<<<<< HEAD
import CategoryScreen from './CategoryScreen';
export default () => <CategoryScreen category="ของใช้/สารเคมี" />;
=======

const chemicalProducts = [
  { id: '1', name: 'Detergent', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Bleach', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Disinfectant', image: 'https://via.placeholder.com/100' },
];

const ChemicalScreen = () => <CategoryScreen category="Chemicals" products={chemicalProducts} />;

export default ChemicalScreen;
>>>>>>> f559e92e7f9cf193517c0f2c81b470b2e85a1e0b
