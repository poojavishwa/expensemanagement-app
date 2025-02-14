import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import { addTransaction, createTable } from '../db/incomeDB';

interface TransactionFormProps {
  visible: boolean;
  category: string;
  onClose: () => void;
  onSave: () => void; // Refresh list after adding
}

const AddTransaction: React.FC<TransactionFormProps> = ({ visible, category, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    createTable(); // Ensure table exists on component mount
  }, []);

  const handleToggleInput = () => {
    setOpen(true);
  };

  const handleSave = () => {
    if (!title || !amount || !selectedDate) return alert('Please fill all fields');

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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.modalTitle}>Add Transaction for {category}</Text>

          <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity onPress={handleToggleInput} style={styles.dateInput}>
            <Text style={styles.dateText}>
              {selectedDate ? moment(selectedDate).format('DD MMMM, YYYY') : 'Select date'}
            </Text>
          </TouchableOpacity>

          {/* Date Picker */}
          <DatePicker
            modal
            open={open}
            date={selectedDate}
            mode="date"
            onConfirm={(date) => {
              setSelectedDate(date);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
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
    marginBottom: 10,
  },
  dateInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default AddTransaction;
