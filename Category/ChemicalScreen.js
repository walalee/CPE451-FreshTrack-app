import React from 'react';
import CategoryScreen from './CategoryScreen';

const chemicalProducts = [
  { id: '1', name: 'Detergent', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Bleach', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Disinfectant', image: 'https://via.placeholder.com/100' },
];

const ChemicalScreen = () => <CategoryScreen category="Chemicals" products={chemicalProducts} />;

export default ChemicalScreen;
