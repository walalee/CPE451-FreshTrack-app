import React from 'react';


const processedFoodProducts = [
  { id: '1', name: 'Canned Tuna', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Instant Noodles', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Sausages', image: 'https://via.placeholder.com/100' },
];

const ProcessedScreen = () => <CategoryScreen category="Processed Food" products={processedFoodProducts} />;

export default ProcessedScreen;
