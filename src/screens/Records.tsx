import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteTransactionFromDB, getTotalExpenses, getTransactions } from '../db/expenseDB';
import { deleteTransactionFromDB1, getTransactions1 } from '../db/incomeDB';
import { getTotalIncome } from '../db/incomeDB';
import TransactionList from './TransactionList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import HomeHeader from '../component/HomeHeader';

const Records = () => {
    const navigation = useNavigation();
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [incomeTransactions, setIncomeTransactions] = useState<any[]>([]);
    const [adLoaded, setAdLoaded] = useState(false);
    const [navigateTo, setNavigateTo] = useState<string | null>(null);
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );


    useEffect(() => {
            if (navigateTo === 'expenses') {
                navigation.navigate('AllExpenses', { transactions, deleteTransaction, setTransactions });
            } else if (navigateTo === 'income') {
                navigation.navigate('AllIncome', { incomeTransactions, setIncomeTransactions, deleteIncomeTransaction });
            }
            setNavigateTo(null); // Reset navigation state

    }, [navigateTo]);


   



    const fetchData = async () => {
        setRefreshing(true);
        await fetchTotalExpenses();
        await fetchTotalIncome();
        await fetchTransactions();
        await fetchIncomeTransactions();
        setRefreshing(false);
    };

    const fetchTransactions = () => {
        getTransactions((data) => {
            // console.log('Fetched Transactions:', data);
            setTransactions(data);
        });
    };
    const fetchIncomeTransactions = () => {
        getTransactions1((data) => {
            console.log('Fetched Transactions:', data);
            setIncomeTransactions(data);
        });
    };

    const fetchTotalExpenses = async () => {
        getTotalExpenses((total) => {
            setTotalExpenses(total);
        });
    };

    const fetchTotalIncome = async () => {
        getTotalIncome((total) => {
            setTotalIncome(total);
        });
    };

    const deleteTransaction = (id: number) => {
        deleteTransactionFromDB(id, () => {
            fetchTransactions(); 
        });
    };
    const deleteIncomeTransaction = (id: number) => {
        deleteTransactionFromDB1(id, () => {
            fetchIncomeTransactions(); 
        });
    };

    const availableBalance = totalIncome - totalExpenses;

    const showAdOrNavigate = (type: 'expenses' | 'income') => {
        if (adLoaded) {
            setNavigateTo(type);
        } else {
            if (type === 'expenses') {
                navigation.navigate('AllExpenses', { transactions, deleteTransaction, setTransactions });
            } else {
                navigation.navigate('AllIncome', { incomeTransactions, setIncomeTransactions, deleteIncomeTransaction });
            }
        }
    }

    return (
        <>
            <HomeHeader title="Spend Sage" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={[]} // Empty data, because transactions are inside TransactionList
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={(
                        <>
                            <View style={styles.box}>
                                <Text style={styles.textStyle}>Available Balance</Text>
                                <Text style={styles.textStyle}>₹{availableBalance.toFixed(2)}</Text>
                            </View>
                            <View style={styles.gridContainer}>
                                <TouchableOpacity style={styles.gridItem}   onPress={() => showAdOrNavigate('expenses')}>
                                    <Image
                                        source={require("../assets/expense.png")} // Change this to your actual image path
                                        style={{ width: 40, height: 40, resizeMode: "contain" }}
                                    />
                                    <Text>Expenses</Text>
                                    <Text>₹{totalExpenses.toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.gridItem} 
                                onPress={() => showAdOrNavigate('income')}>
                                <Image
                                        source={require("../assets/income.png")} // Change this to your actual image path
                                        style={{ width: 40, height: 40, resizeMode: "contain" }}
                                    />
                                    <Text>Income</Text>
                                    <Text>₹ {totalIncome.toFixed(2)}</Text>
                                </TouchableOpacity>
                            </View>
                            <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} 
                             showAdOrNavigate={showAdOrNavigate}/>
                        </>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                    }
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        margin: 15,
    },
    gridContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        height: 100,
        backgroundColor: '#DEDEDE',
        justifyContent: 'center',
        alignItems: 'start',
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
    },
    box: {
        backgroundColor: "#10b981",
        color: "white",
        padding: 30,
        borderRadius: 10,
    },
    textStyle: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default Records;
