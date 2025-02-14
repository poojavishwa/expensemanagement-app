import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { addCategory, getCategories } from '../db/categoryDB';
import AddIncomeTransaction from '../component/AddIncomeTransaction';
import { getTransactions } from '../db/incomeDB';
import AddCategory from '../component/AddCategory';

const defaultCategories = [
  { id: 0, name: 'Salary', type: 'income' }, 
  { id: 1, name: 'Investments', type: 'income' },
  { id: 2, name: 'Part-Time', type: 'income' },
  { id: 3, name: 'Bonus', type: 'income' },
];


const IncomeTab = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
   const [AddIncomeVisible, setAddIncomeVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories from SQLite
  useEffect(() => {
    fetchCategories();
  }, []);

  getTransactions(data => {
    console.log('Current transactions:', data);
  });

  const fetchCategories = () => {
    getCategories((data) => {
      let incomeCategories = data.filter((category) => category.type === 'income');
  
      // Check if default categories exist in DB
      const existingCategoryNames = incomeCategories.map((cat) => cat.name);
      const missingCategories = defaultCategories.filter(
        (cat) => !existingCategoryNames.includes(cat.name)
      );
  
      // Insert missing default categories into DB
      if (missingCategories.length > 0) {
        missingCategories.forEach((category) => {
          addCategory(category.name, 'income', () => fetchCategories()); 
        });
      } else {
        setCategories(incomeCategories);
      }
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openTransactionModal = (category: string) => {
    setSelectedCategory(category);
    setAddIncomeVisible(true);
  };

  const closeTransactionModal = () => {
    setAddIncomeVisible(false);
  };

  const handleSaveCategory = () => {
    fetchCategories(); // ✅ Refresh categories after adding
    closeModal();
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
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      <AddCategory 
        type="income"
        visible={modalVisible} 
        onClose={closeModal} 
        onSave={handleSaveCategory} // ✅ Refresh categories on save
      />
      <AddIncomeTransaction  
      visible={AddIncomeVisible} 
        category={selectedCategory} 
        onClose={closeTransactionModal} 
        onSave={handleSaveTransaction} />
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

export default IncomeTab;
