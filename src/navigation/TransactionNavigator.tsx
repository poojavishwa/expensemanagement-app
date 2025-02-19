import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import IncomeTab from '../Tabs/IncomeTab';
import ExpenseTab from '../Tabs/ExpenseTab';

const TransactionNavigation: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'income', title: 'Income' },
    { key: 'expense', title: 'Expense' },
  ]);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'income':
        return <IncomeTab />;
      case 'expense':
        return <ExpenseTab />;
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
  },
});

export default TransactionNavigation;
