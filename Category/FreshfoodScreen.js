import React from 'react';


const freshFoodProducts = [
  { id: '1', name: 'Apples', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Bananas', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Tomatoes', image: 'https://via.placeholder.com/100' },
];

const FreshfoodScreen = () => <CategoryScreen category="Fresh Food" products={freshFoodProducts} />;

export default FreshfoodScreen;
