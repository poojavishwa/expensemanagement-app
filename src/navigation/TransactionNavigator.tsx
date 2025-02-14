import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomeTab from '../Tabs/IncomeTab';
import ExpenseTab from '../Tabs/ExpenseTab';

const Tab = createMaterialTopTabNavigator();

const TransactionNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#000' },
      }}
    >
      <Tab.Screen name="Income" component={IncomeTab} />
      <Tab.Screen name="Expense" component={ExpenseTab} />
    </Tab.Navigator>
  );
};

export default TransactionNavigation;
