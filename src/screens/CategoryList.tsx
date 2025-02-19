import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import IncomeReport from '../Tabs/IncomeReport';
import ExpenseReport from '../Tabs/ExpenseReport';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import Date Picker
import Icon from 'react-native-vector-icons/FontAwesome5';

const CategoryList: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'income', title: 'Income' },
    { key: 'expense', title: 'Expense' },
  ]);

 
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
  };
  
  const { firstDay, lastDay } = getCurrentMonthRange();
  const [startDate, setStartDate] = useState<Date | null>(firstDay);
  const [endDate, setEndDate] = useState<Date | null>(lastDay);

  

  const handleStartDateConfirm = (date: Date) => {
    setStartDate(date);
    setStartDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date: Date) => {
    setEndDate(date);
    setEndDatePickerVisible(false);
  };

  // Reset filters
  const handleReset = () => {
    const { firstDay, lastDay } = getCurrentMonthRange();
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'income':
        return <IncomeReport startDate={startDate} endDate={endDate} />;
      case 'expense':
        return <ExpenseReport startDate={startDate} endDate={endDate} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Date Range Filter Section */}
      <View style={styles.dateRangeContainer}>
        <Icon name="filter" size={25} color="black" />
        <TextInput
          style={styles.dateInput}
          placeholder="Select Start Date"
          value={startDate ? startDate.toLocaleDateString() : ''}
          onFocus={() => setStartDatePickerVisible(true)}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="Select End Date"
          value={endDate ? endDate.toLocaleDateString() : ''}
          onFocus={() => setEndDatePickerVisible(true)}
        />
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton}>Reset </Text>
        </TouchableOpacity>
      </View>

      {/* TabView Component */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black', height: 3 }}
            style={{ backgroundColor: 'white' }}
            activeColor="black"
            inactiveColor="gray"
          />
        )}
      />

      {/* Date Pickers */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        date={startDate || new Date()}
        onConfirm={handleStartDateConfirm}
        onCancel={() => setStartDatePickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        date={endDate || new Date()}
        onConfirm={handleEndDateConfirm}
        onCancel={() => setEndDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  },
});

export default CategoryList;
