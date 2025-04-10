import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing Icon
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const TransactionList = ({transactions,deleteTransaction,showAdOrNavigate}) => {
  const navigation = useNavigation();
  const confirmDeleteTransaction = (id: number) => {
    Alert.alert(
      "Delete Expense", 
      "Are you sure you want to delete this transaction?", 
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) }
      ]
    );
  };
 

  return (
    <View>
      {/* Heading and Button */}
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Recent Expenses</Text>
        <TouchableOpacity style={styles.button} 
           onPress={() => showAdOrNavigate('expenses')}
          >
          <Text style={styles.buttonText}>Show More</Text>
        </TouchableOpacity>
      </View>
    <View style={styles.cantainer}>
      {transactions.length === 0 ? (
        <Text style={styles.noDataText}>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions.slice(0, 10)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Transaction Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{moment(item.date).format('DD-MM-YYYY')}</Text>
              </View>
              
              {/* Amount & Category */}
              <View style={styles.rightContainer}>
                <Text style={styles.amount}>-₹{item.amount}</Text>
                <Text style={styles.category}>{item.category +"    "}</Text>
              </View>

              {/* Delete Button (Cross Icon) */}
              <TouchableOpacity onPress={() => confirmDeleteTransaction(item.id)} style={styles.deleteButton} >
                <Icon name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cantainer:{
    marginBottom:100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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
  },
  detailsContainer: {
    flex: 1, // Takes available space
  },
  rightContainer: {
    flexShrink: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  deleteButton: {
    padding: 4, // Spacing around the icon
  },
  category: {
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    // textAlign: 'center',
    // overflow: 'hidden',
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
    color: '#FF5733',
  },
});

export default TransactionList;
