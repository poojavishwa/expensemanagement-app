import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { deleteTransactionFromDB, getTotalExpenses, getTransactions } from '../db/expenseDB';
import { getTotalIncome } from '../db/incomeDB';
import TransactionList from './TransactionList';

const Records = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
     const [transactions, setTransactions] = useState<any[]>([]);
    console.log("transactions",transactions)


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setRefreshing(true);
        await fetchTotalExpenses();
        await fetchTotalIncome();
        await fetchTransactions();
        setRefreshing(false);
    };

    const fetchTransactions = () => {
        getTransactions((data) => {
          console.log('Fetched Transactions:', data);
          setTransactions(data);
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
          fetchTransactions(); // Refresh list after deletion
        });
      };

    const availableBalance = totalIncome - totalExpenses;

    return (
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
                            <View style={styles.gridItem}>
                                <Icon name="wallet" size={30} color="#FF5733" />
                                <Text>Expenses</Text>
                                <Text>₹{totalExpenses.toFixed(2)}</Text>
                            </View>
                            <View style={styles.gridItem}>
                                <Icon name="wallet" size={30} color="#4CAF50" />
                                <Text>Income</Text>
                                <Text>₹ {totalIncome.toFixed(2)}</Text>
                            </View>
                        </View>
                        <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
                    </>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        margin: 20,
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
        backgroundColor: "#fbbc05",
        padding: 30,
        borderRadius: 10,
    },
    textStyle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default Records;
