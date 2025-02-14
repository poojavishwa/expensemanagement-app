import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
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
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
  },
  saveButton: {
    backgroundColor: '#0072ea',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCategory;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

