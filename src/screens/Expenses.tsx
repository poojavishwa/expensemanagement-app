import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getTransactions } from '../db/expenseDB';
import ExpenseHeader from '../component/ExpenseHeader';
import ExpenseFilterModal from '../component/ExpenseFilterModal';
import moment from 'moment';

const Expenses = () => {

    const route = useRoute();
    const { deleteTransaction, setTransactions } = route.params || {};

    const [isFilterVisible, setFilterVisible] = useState(false);
    const [transactions, setLocalTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

    useEffect(() => {
        if (transactions.length > 0) {
            handleFilter();
        }
    }, [startDate, endDate, selectedCategory]);

    useFocusEffect(
        React.useCallback(() => {
            getTransactions((data) => {
                if (!data) return;

                const today = new Date();
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

                setLocalTransactions(data);
                setStartDate(firstDay);
                setEndDate(lastDay);

                // Apply default filtering for current month
                const filteredData = data.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    return transactionDate >= firstDay && transactionDate <= lastDay;
                });

                setFilteredTransactions(filteredData);
                if (setTransactions) setTransactions(data); // Avoid possible undefined error

                const uniqueCategories = [...new Set(data.map(item => item.category))].map(category => ({
                    label: category,
                    value: category,
                  }));
                  setCategories(uniqueCategories);
            });
        }, [])
    );


    const handleFilter = () => {
        let filtered = [...transactions];

        if (startDate) {
            filtered = filtered.filter(transaction => new Date(transaction.date) >= startDate);
        }
        if (endDate) {
            filtered = filtered.filter(transaction => new Date(transaction.date) <= endDate);
        }
        if (selectedCategory) {
            filtered = filtered.filter(transaction => transaction.category === selectedCategory);
        }

        setFilteredTransactions(filtered);
    };

    const handleReset = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        setStartDate(firstDay);
        setEndDate(lastDay);
        setSelectedCategory("");

        // Reapply current month filter
        const currentMonthTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= firstDay && transactionDate <= lastDay;
        });

        setFilteredTransactions(currentMonthTransactions);
        setFilterVisible(false)
    };

    const handleApplyFilter = (filters: { category: string | null; startDate: Date; endDate: Date }) => {
        setSelectedCategory(filters.category);
        setStartDate(filters.startDate);
        setEndDate(filters.endDate);
        setFilterVisible(false); // Close modal
        handleFilter(filters); // Apply the filters
    };



    const confirmDeleteTransaction = (id) => {
        Alert.alert(
            "Delete Expense",
            "Are you sure you want to delete this transaction?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteTransaction(id);
                        const updatedTransactions = transactions.filter(txn => txn.id !== id);
                        setLocalTransactions(updatedTransactions);
                        setTransactions?.(updatedTransactions);

                              // Update the filtered transactions immediately
                              const updatedFiltered = filteredTransactions.filter(txn => txn.id !== id);
                              setFilteredTransactions(updatedFiltered);
                    }
                }
            ]
        );
    };

    return (
        <View>
            <ExpenseHeader title="Expenses" onFilterPress={() => setFilterVisible(true)} />
            {filteredTransactions.length === 0 ? (
                <Text style={styles.noDataText}>No Data Found</Text>
            ) : (
                <FlatList
                    data={filteredTransactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.date}>{moment(item.date).format('DD-MM-YYYY')}</Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text style={styles.amount}>-₹{item.amount}</Text>
                                <Text style={styles.category}>{item.category}  </Text>
                            </View>
                            <TouchableOpacity onPress={() => confirmDeleteTransaction(item.id)} style={styles.deleteButton}>
                                <Icon name="close" size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            <ExpenseFilterModal
                visible={isFilterVisible}
                onApply={handleApplyFilter}
                categories={categories}
                handleReset={handleReset}
            />
        </View>
    );
};

export default Expenses;

const styles = StyleSheet.create({
    filterContainer: {
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    picker: {
        height: 50,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    dateRangeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    dateInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginHorizontal: 5,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        color: 'white',
        borderRadius: 5,
    },
    noDataText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginVertical: 5,
        margin: 10
    },
    detailsContainer: {
        flex: 1,
    },
    rightContainer: {
        flexShrink: 1,
        alignItems: "flex-end",
        marginRight: 10,
    },
    deleteButton: {
        padding: 4,
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4CAF50",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
    },
    date: {
        fontSize: 14,
        color: "gray"
    },
    amount: {
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    resetButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        color: 'white',
    },
});