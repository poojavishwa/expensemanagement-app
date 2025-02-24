import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getTransactions1 } from '../db/incomeDB'; // Assuming you already have this function to get all transactions.
import { useFocusEffect } from '@react-navigation/native';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const IncomeReport = ({ startDate, endDate }: { startDate: Date | null; endDate: Date | null }) => {
  const [categoriesTotal, setCategoriesTotal] = useState<any[]>([]);

  const fetchTransactions = () => {
    getTransactions1((transactions) => {
      // Filter transactions based on the selected date range
      // console.log("Fetched Transactions:", transactions);
      const filteredTransactions = transactions.filter((transaction: Transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          (!startDate || transactionDate >= startDate) && (!endDate || transactionDate <= endDate)
        );
      });

      // Group filtered transactions by category and sum the amounts
      const categoryTotals: any = {};
      filteredTransactions.forEach((transaction: Transaction) => {
        if (categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] += transaction.amount;
        } else {
          categoryTotals[transaction.category] = transaction.amount;
        }
      });

      // Convert the category totals object to an array for rendering
      const categoryTotalArray = Object.keys(categoryTotals).map((category) => ({
        category,
        totalAmount: categoryTotals[category],
      }));

      setCategoriesTotal(categoryTotalArray); // Set the category totals
    });
  }
  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [startDate, endDate])
  );

  return (
    <>
    <View style={styles.container}>
      {categoriesTotal.length === 0 ? (
        <Text style={styles.noDataText}>No income data found for the selected date range</Text>
      ) : (
        <FlatList
        nestedScrollEnabled={true} 
          data={categoriesTotal}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.category}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.amount}>+₹{item.totalAmount}</Text>
              </View>
            </View>
          )}
        contentContainerStyle={{ paddingBottom: 20 }} 
        />
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 10,
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  rightContainer: {
    flexShrink: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  amount: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default IncomeReport;
