import React from 'react';


const vegFruitsProducts = [
  { id: '1', name: 'Carrots', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Oranges', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Broccoli', image: 'https://via.placeholder.com/100' },
];

const VegFruitsScreen = () => <CategoryScreen category="Vegetables & Fruits" products={vegFruitsProducts} />;

export default VegFruitsScreen;
