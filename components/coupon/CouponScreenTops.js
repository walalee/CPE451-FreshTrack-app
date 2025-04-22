import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const CouponScreenTops = () => {
  const [tab, setTab] = useState('all');
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [ownedCouponsCount, setOwnedCouponsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const formattedCoupons = data.slice(0, 10).map(item => ({
        id: item.id,
        title: item.title,
        description: item.body,
        owned: Math.random() > 0.5,
      }));

      const ownedCoupons = formattedCoupons.filter(c => c.owned);
      setOwnedCouponsCount(ownedCoupons.length);

      setAllCoupons(formattedCoupons);
      setCoupons(formattedCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'mine') {
      const owned = allCoupons.filter(c => c.owned);
      setCoupons(owned);
    } else {
      setCoupons(allCoupons);
    }
  }, [tab, allCoupons]);

  const handleCollectCoupon = (id) => {
    const updated = allCoupons.map(coupon =>
      coupon.id === id ? { ...coupon, owned: true } : coupon
    );

    setAllCoupons(updated);
    setOwnedCouponsCount(updated.filter(c => c.owned).length);

    if (tab === 'mine') {
      setCoupons(updated.filter(c => c.owned));
    } else {
      setCoupons(updated);
    }
  };

  const handleRemoveCoupon = (id) => {
    const updated = allCoupons.map(coupon =>
      coupon.id === id ? { ...coupon, owned: false } : coupon
    );

    setAllCoupons(updated);
    setOwnedCouponsCount(updated.filter(c => c.owned).length);

    if (tab === 'mine') {
      setCoupons(updated.filter(c => c.owned));
    } else {
      setCoupons(updated);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack('Homescreen')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>คูปองและโปรโมชั่น Tops</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'all' && styles.activeTab]}
          onPress={() => setTab('all')}
        >
          <Text>คูปองทั้งหมด</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === 'mine' && styles.activeTab]}
          onPress={() => setTab('mine')}
        >
          <Text>คูปองของฉัน</Text>
        </TouchableOpacity>
      </View>

      {tab === 'mine' && (
        <View style={styles.ownedCouponBox}>
          <Text style={styles.ownedCouponText}>คูปองของฉัน</Text>
          <Text style={styles.ownedCouponText}>{ownedCouponsCount} ใบ</Text>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={coupons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.couponCard}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CouponDetail', { coupon: item })}
              >
                <Text style={styles.couponTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>

              {!item.owned && (
                <TouchableOpacity
                  style={styles.collectButton}
                  onPress={() => handleCollectCoupon(item.id)}
                >
                  <Text style={styles.collectButtonText}>เก็บคูปอง</Text>
                </TouchableOpacity>
              )}

              {item.owned && (
                <View style={styles.ownedRow}>
                  <Text style={styles.ownedLabel}>✓ คุณเก็บคูปองนี้แล้ว</Text>
                  {tab === 'mine' && (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveCoupon(item.id)}
                    >
                      <Text style={styles.removeButtonText}>ลบ</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A00000',
    padding: 15,
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  backButton: {
    marginRight: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 15,
    padding: 10,
    borderRadius: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#d1d1d1',
  },
  ownedCouponBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  ownedCouponText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  couponCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  couponTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  collectButton: {
    marginTop: 10,
    backgroundColor: '#d1d1d1',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  collectButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  ownedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ownedLabel: {
    color: 'gray',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#9D0300',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CouponScreenTops;
