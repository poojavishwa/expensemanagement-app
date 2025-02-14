import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import { addTransaction, createTable } from '../db/incomeDB';

interface TransactionFormProps {
  visible: boolean;
  category: string;
  onClose: () => void;
  onSave: () => void; // Refresh list after adding
}

const AddIncomeTransaction: React.FC<TransactionFormProps> = ({ visible, category, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    createTable(); 
  }, []);

  const handleSave = () => {
    if (!title || !amount) {
      alert('Please fill all fields');
      return;
    }

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    addTransaction(title, amount, formattedDate, category, () => {
      onSave();
      setTitle('');
      setAmount('');
      setSelectedDate(new Date());
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
        <Text style={styles.modalTitle}>Add Transaction for {category}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Date Picker */}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
          <Text style={styles.dateText}>
            {moment(selectedDate).format('DD MMMM, YYYY')}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowPicker(false); // Hide picker after selection
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
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

export default AddIncomeTransaction;
