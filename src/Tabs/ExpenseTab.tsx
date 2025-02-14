import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AddCategory from '../component/AddCategory';
import AddTransaction from '../component/AddTransaction';
import { addCategory, clearCategories, getCategories } from '../db/categoryDB';

const defaultCategories = [
  { id: 0, name: 'Food', type: 'expense' },
  { id: 1, name: 'Shopping', type: 'expense' },
  { id: 2, name: 'Travel', type: 'expense' },
  { id: 3, name: 'Grocery', type: 'expense' },
  { id: 4, name: 'Vegitable', type: 'expense' },
  { id: 5, name: 'Health', type: 'expense' },
];

const ExpenseTab = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories from SQLite
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getCategories((data) => {
      const expenseCategories = data.filter((category) => category.type === 'expense');

      // Check if default categories exist
      const existingCategoryNames = expenseCategories.map((cat) => cat.name);
      const missingCategories = defaultCategories.filter(
        (cat) => !existingCategoryNames.includes(cat.name)
      );

      // Insert missing default categories
      if (missingCategories.length > 0) {
        missingCategories.forEach((category) => {
          addCategory(category.name, 'expense', () => fetchCategories());
        });
      } else {
        setCategories(expenseCategories);
      }
    });
  };


  const openCategoryModal = () => {
    setCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const openTransactionModal = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const closeTransactionModal = () => {
    setModalVisible(false);
  };

  const handleSaveCategory = () => {
    fetchCategories(); // Refresh categories
    closeCategoryModal();
  };

  const handleSaveTransaction = (title: string, amount: string, date: string) => {
    console.log('Transaction Saved:', { title, amount, date, category: selectedCategory });
    closeTransactionModal();
  };

  

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => openTransactionModal(item.name)}>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.addButton} onPress={openCategoryModal}>
          <Text style={styles.addText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      <AddCategory 
        type="expense"
        visible={categoryModalVisible} 
        onClose={closeCategoryModal} 
        onSave={handleSaveCategory} 
      />

      <AddTransaction
        visible={modalVisible} 
        category={selectedCategory} 
        onClose={closeTransactionModal} 
        onSave={handleSaveTransaction} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F5F5F5' },
  item: {
    flex: 1,
    backgroundColor: '#DEDEDE',
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: { fontSize: 16, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#fbbc05',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});

export default ExpenseTab;

