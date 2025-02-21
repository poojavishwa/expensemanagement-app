import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getTransactions } from '../db/expenseDB'; // Assuming you already have this function to get all transactions.
import { useFocusEffect } from '@react-navigation/native';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const ExpenseReport = ({ startDate, endDate }: { startDate: Date | null; endDate: Date | null }) => {
  const [categoriesTotal, setCategoriesTotal] = useState<any[]>([]);
  const fetchTransactions = () => {
    // Fetch all transactions
    getTransactions((expenses) => {
      // Filter transactions based on the selected date range
      const filteredExpenses = expenses.filter((expense: Transaction) => {
        const expenseDate = new Date(expense.date);
        return (
          (!startDate || expenseDate >= startDate) && (!endDate || expenseDate <= endDate)
        );
      });
      
      // Group filtered expenses by category and sum the amounts
      const categoryTotals: any = {};
      filteredExpenses.forEach((expense: Transaction) => {
        if (categoryTotals[expense.category]) {
          categoryTotals[expense.category] += expense.amount;
        } else {
          categoryTotals[expense.category] = expense.amount;
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
    <View style={styles.container}>
      {categoriesTotal.length === 0 ? (
        <Text style={styles.noDataText}>No expense data found for the selected date range</Text>
      ) : (
        <FlatList
          data={categoriesTotal}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.category}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.amount}>-₹{item.totalAmount}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: '#FF5733',
  },
});

export default ExpenseReport;
