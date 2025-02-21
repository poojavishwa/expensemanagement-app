import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import IncomeReport from '../Tabs/IncomeReport';
import ExpenseReport from '../Tabs/ExpenseReport';


const CategoryList = ({ startDate, endDate, setStartDate, setEndDate, onApplyFilter, onResetFilter }) => {
  const layout = useWindowDimensions();
 
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'income', title: 'Income' },
    { key: 'expense', title: 'Expense' },
  ]);

 

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    margin:10,
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
