import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const CouponScreen = () => {
    const [tab, setTab] = useState('all');
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCoupons();
    }, [tab]);

    const fetchCoupons = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            // แปลงข้อมูล API ให้มีโครงสร้างเหมือน MOCK_COUPONS
            const formattedCoupons = data.slice(0, 10).map(item => ({
                id: item.id,
                title: item.title,
                description: item.body,
                owned: Math.random() > 0.5, // สุ่มให้บางอันเป็นของฉัน
            }));

            setCoupons(tab === 'all' ? formattedCoupons : formattedCoupons.filter(c => c.owned));
        } catch (error) {
            console.error('Error fetching coupons:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>คูปองและโปรโมชั่น Tesco Lotus</Text>
            </View>
            
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, tab === 'all' && styles.activeTab]} onPress={() => setTab('all')}>
                    <Text>คูปองทั้งหมด</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, tab === 'mine' && styles.activeTab]} onPress={() => setTab('mine')}>
                    <Text>คูปองของฉัน</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={coupons}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.couponCard} 
                            onPress={() => navigation.navigate('CouponDetail', { coupon: item })}
                        >
                            <Text style={styles.couponTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#A00000', padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    backButton: { marginRight: 10 },
    title: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    tab: { padding: 10, backgroundColor: 'white', borderRadius: 8 },
    activeTab: { backgroundColor: '#FFD700' },
    couponCard: { backgroundColor: 'white', padding: 15, marginVertical: 5, borderRadius: 10 },
    couponTitle: { fontWeight: 'bold', fontSize: 16 },
});

export default CouponScreen;