import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const CouponScreenLotus = () => {
    const [tab, setTab] = useState('all');
    const [coupons, setCoupons] = useState([]);
    const [ownedCouponsCount, setOwnedCouponsCount] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        PromptRegular: require('./assets/Prompt-Regular.ttf'),
        PromptLight: require('./assets/Prompt-Light.ttf'),
        PromptBold: require('./assets/Prompt-Bold.ttf'), 
        PromptMedium: require('./assets/Prompt-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

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

            setCoupons(formattedCoupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (tab === 'mine') {
            setCoupons(prevCoupons => prevCoupons.filter(c => c.owned));
        } else {
            fetchCoupons();
        }
    }, [tab]);

    return (
        <View style={styles.container}>
            {/* หัวข้อและปุ่มย้อนกลับ */}
            <View style={styles.headerBackground} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>คูปองและโปรโมชั่น Tesco Lotus</Text>
            </View>

            {/* แท็บเลือก */}
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

            {/* แสดงจำนวนคูปองเฉพาะในแท็บ "คูปองของฉัน" */}
            {tab === 'mine' && (
                <View style={styles.ownedCouponBox}>
                    <Text style={styles.ownedCouponText}>คูปองของฉัน</Text>
                    <Text style={styles.ownedCouponText}>{ownedCouponsCount} ใบ</Text>
                </View>
            )}

            {/* รายการคูปอง */}
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
});

export default CouponScreenLotus;
