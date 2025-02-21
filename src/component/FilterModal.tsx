import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterModal = ({ visible, onApply ,categories,handleReset}) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filter Transactions</Text>

          {/* Dropdown for category selection */}
          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={categories}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            placeholder="Select Category"
            style={styles.dropdown}
          />

          {/* Date Range Pickers */}
          <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
            <Text>Start Date: {startDate.toDateString()}               </Text>
            <Icon name="calendar-today" size={20} color="gray" style={styles.calendarIcon} />
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
            <Text>End Date: {endDate.toDateString()}  </Text>
            <Icon name="calendar-today" size={20} color="gray" style={styles.calendarIcon} />
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleReset} style={[styles.button,styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onApply({ category: selectedCategory, startDate, endDate })}
              style={[styles.button,styles.applyButton]}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff',  padding: 20, borderRadius: 10,margin:10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dropdown: { marginBottom: 15, zIndex: 1000 },
  dateButton: { padding: 10, backgroundColor: '#f1f1f1', marginBottom: 10, borderRadius: 5,flexDirection:"row", justifyContent:"space-between" },
  buttonContainer: { flexDirection: 'row',  justifyContent: 'space-between', marginTop: 10 , width: '100%', },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  calendarIcon: { marginLeft: 10 },
  cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 5 },
  applyButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default FilterModal;
