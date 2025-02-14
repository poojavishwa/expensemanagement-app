import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Modal from 'react-native-modal';
import { addCategory } from '../db/categoryDB';

interface AddCategoryProps {
  visible: boolean;
  type: 'income' | 'expense';  // ✅ Add type prop
  onClose: () => void;
  onSave: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ visible, type, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (!categoryName) return alert('Please enter a category name');

    addCategory(categoryName, type, () => {
      onSave();
      setCategoryName('');
      onClose();
    });
  };

  return (
    <Modal 
    isVisible={visible}
    onBackdropPress={onClose}
    style={styles.modal}
    swipeDirection="down"
    onSwipeComplete={onClose}
    propagateSwipe
   >
        <View style={styles.modalContent}>
             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.modalTitle}>Add {type} Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={onClose} color="red" />
              <Button title="Save" onPress={handleSave} />
            </View>
          </KeyboardAvoidingView>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'stretch', 
    paddingBottom: 20, 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
     marginBottom: 10 
    },
  input: { 
    width: '100%', 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    marginBottom: 10 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' },
});

export default AddCategory;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

