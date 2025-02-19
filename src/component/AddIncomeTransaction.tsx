import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { addTransaction, createTable } from '../db/incomeDB';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

interface TransactionFormProps {
  visible: boolean;
  category: string;
  onClose: () => void;
  onSave: () => void; // Refresh list after adding
}

const AddIncomeTransaction: React.FC<TransactionFormProps> = ({ visible, category, onClose, onSave }) => {
  const navigation =  useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
 const slideAnim = useState(new Animated.Value(Platform.OS === 'ios' ? 300 : 500))[0]; // Initial position offscreen

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
      navigation.navigate('AllIncome' ,{ refresh: true });
    });
  };

  
    useEffect(() => {
      if (visible) {
        // Slide up when the modal is visible
        Animated.spring(slideAnim, {
          toValue: 0,  // Final position (slide to the top)
          useNativeDriver: true,
        }).start();
      } else {
        // Slide down when the modal is not visible
        Animated.spring(slideAnim, {
          toValue: Platform.OS === 'ios' ? 300 : 500, // Reset to off-screen position
          useNativeDriver: true,
        }).start();
      }
    }, [visible]);

  return (
    <View style={styles.container}>
        {visible && (
        // Add BlurView for background blur
        <BlurView
          style={styles.blurContainer}
          blurType="light" // Blur style, can be adjusted (light, dark, extraLight, etc.)
          blurAmount={7} // Amount of blur
        >
          <TouchableOpacity style={styles.background} onPress={onClose} />
        </BlurView>
      )}
 <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
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
    </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above other content
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
