import React from 'react';


const careProducts = [
  { id: '1', name: 'Shampoo', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Lotion', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Soap', image: 'https://via.placeholder.com/100' },
];

const CareScreen = () => <CategoryScreen category="Care Products" products={careProducts} />;

export default CareScreen;
