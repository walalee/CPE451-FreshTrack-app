import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CouponScreenBigC from './coupon/CouponScreenBigC';
import CouponScreenLotus from './coupon/CouponScreenLotus';
import CouponScreenMakro from './coupon/CouponScreenMakro';
import CouponScreenTops from './coupon/CouponScreenTops';



const { width } = Dimensions.get('window');
const bannerWidth = width * 0.8;
const bannerMargin = 10;

const banners = [
  { id: '1', image: require('../assets/lotusCoupon.png'), brand: 'Lotus' },
  { id: '2', image: require('../assets/bigcCoupon.jpg'), brand: 'BigC' },
  { id: '3', image: require('../assets/marko.png'), brand: 'Makro' },
  { id: '4', image: require('../assets/topscoupon.jpg'), brand: 'Tops' },
];

const infiniteBanners = [banners[banners.length - 1], ...banners, banners[0]]; // เพิ่มรูปซ้ำหัวท้าย

const Banner = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToNext = () => {
    let nextIndex = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const onScrollEnd = (event) => {
    let index = Math.round(event.nativeEvent.contentOffset.x / (bannerWidth + bannerMargin * 2));
    if (index === infiniteBanners.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: false });
      }, 300);
      index = 1;
    } else if (index === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: banners.length, animated: false });
      }, 300);
      index = banners.length;
    }
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={infiniteBanners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            switch (item.brand) {
              case 'Lotus':
                navigation.navigate('CouponScreenLotus');
                break;
              case 'BigC':
                navigation.navigate('CouponScreenBigC');
                break;
              case 'Makro':
                navigation.navigate('CouponScreenMakro');
                break;
              case 'Tops':
                navigation.navigate('CouponScreenTops');
                break;
              default:
                break;
            }
          }}>
            <Image source={item.image} style={styles.bannerImage} />
          </TouchableOpacity>
        )}
        snapToAlignment="center"
        snapToInterval={bannerWidth + bannerMargin * 2}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        initialScrollIndex={1} // เริ่มที่ index 1 เพราะ index 0 เป็นรูปสุดท้ายที่ซ้ำมา
        getItemLayout={(data, index) => ({ length: bannerWidth + bannerMargin * 2, offset: (bannerWidth + bannerMargin * 2) * index, index })}
        contentContainerStyle={{ paddingHorizontal: (width - bannerWidth) / 2 }}
      />

      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View key={index} style={[styles.indicator, currentIndex === index + 1 && styles.activeIndicator]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bannerImage: {
    width: bannerWidth,
    height: 180,
    borderRadius: 10,
    marginHorizontal: bannerMargin,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
  },
});

export default Banner;
