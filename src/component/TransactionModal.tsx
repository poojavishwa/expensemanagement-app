import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import IncomeTab from '../Tabs/IncomeTab';
import ExpenseTab from '../Tabs/ExpenseTab';

const TransactionModal = ({ isVisible, toggleModal }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'income', title: 'Income' },
    { key: 'expense', title: 'Expense' },
  ]);

  const renderScene = SceneMap({
    income: IncomeTab,
    expense: ExpenseTab,
  });

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={toggleModal}>
      <View style={styles.container}>
        <Text style={styles.header}>Add Transaction</Text>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, backgroundColor: 'white' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
});

export default TransactionModal;
