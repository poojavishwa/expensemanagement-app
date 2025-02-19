import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { getCategories } from '../db/categoryDB';
import { getTotalExpenses, getTransactions } from '../db/expenseDB';
import { getTotalIncome } from '../db/incomeDB';
import CategoryList from './CategoryList';
const Reports = () => {
  const screenWidth = Dimensions.get('window').width;

  const [categories, setCategories] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useEffect(() => {
    getCategories(setCategories);
    getTotalIncome(setTotalIncome);
    getTotalExpenses(setTotalExpenses);
  }, []);

  const pieChartData = [
    { name: 'Income', amount: totalIncome, color: '#36A2EB', legendFontColor: 'black', legendFontSize: 14 },
    { name: 'Expenses', amount: totalExpenses, color: '#FF6384', legendFontColor: 'black', legendFontSize: 14 },
  ];

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{ data: [totalIncome, totalIncome, totalIncome, totalIncome, totalIncome] }],
  };

  return (
        <>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Income vs Expenses</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth - 40}
              height={120}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Monthly Income</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 20}
              height={200}
              yAxisLabel="₹"
              chartConfig={{
                backgroundColor: '#1E293B',
                backgroundGradientFrom: '#1E293B',
                backgroundGradientTo: '#3B82F6',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                barPercentage: 0.2,
              }}
              verticalLabelRotation={30}
            />
          </View>
    <CategoryList/>
    
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    padding: 0,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
  },
  chartTitle: {
    color: '#4A5568',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    padding: 5,
  },
});

export default Reports;
