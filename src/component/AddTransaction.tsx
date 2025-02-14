import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { addTransaction, createTable } from '../db/expenseDB';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface TransactionFormProps {
  visible: boolean;
  category: string;
  onClose: () => void;
  onSave: () => void; // Refresh list after adding
}

const AddTransaction: React.FC<TransactionFormProps> = ({ visible, category, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    createTable(); 
  }, []);


  const handleSave = () => {
    if (!title || !amount ) return alert('Please fill all fields');

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

          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                   <Text style={styles.dateText}>
                     {moment(selectedDate).format('DD MMMM, YYYY')}
                   </Text>
                 </TouchableOpacity>

          {/* Date Picker */}
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
    alignSelf: 'stretch', // Makes it take only the required height
    paddingBottom: 20, // Prevents excessive bottom spacing
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
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

export default AddTransaction;
