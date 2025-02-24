  import React, { useEffect, useState } from 'react';
  import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
  import { PieChart, BarChart } from 'react-native-chart-kit';
  import {  getTotalExpenses1 } from '../db/expenseDB';
  import { getTotalIncome1 } from '../db/incomeDB';
  import CategoryList from './CategoryList';
  import HomeHeader from '../component/HomeHeader';
import ReportFilterModal from '../component/ReportFilterModal';
import Icon from 'react-native-vector-icons/FontAwesome5';



  const Reports = () => {

    const screenWidth = Dimensions.get('window').width;
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
   const [isFilterVisible, setFilterVisible] = useState(false);

    const getCurrentMonthRange = () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { firstDay, lastDay };
    };
  
    const { firstDay, lastDay } = getCurrentMonthRange();
    const [startDate, setStartDate] = useState<Date | null>(firstDay);
    const [endDate, setEndDate] = useState<Date | null>(lastDay);
  
  
  
    const handleApplyFilter = (filters: {  startDate: Date; endDate: Date }) => {
      setStartDate(filters.startDate);
      setEndDate(filters.endDate);
      getTotalIncome1(setTotalIncome, filters.startDate, filters.endDate);
      getTotalExpenses1(setTotalExpenses, filters.startDate, filters.endDate);
      setFilterVisible(false); 
    };
    
  
    // Reset filters
    const handleReset = () => {
      const { firstDay, lastDay } = getCurrentMonthRange();
      setStartDate(firstDay);
      setEndDate(lastDay);
      setFilterVisible(false);
    };

    

   useEffect(() => {
    getTotalIncome1(setTotalIncome, startDate, endDate);
    getTotalExpenses1(setTotalExpenses, startDate, endDate);
  }, [startDate, endDate]);


    const pieChartData = [
      { name: 'Income', amount: totalIncome, color: '#36A2EB', legendFontColor: 'black', legendFontSize: 14 },
      { name: 'Expenses', amount: totalExpenses, color: '#FF6384', legendFontColor: 'black', legendFontSize: 14 },
    ];

    

    return (
      <>
      <HomeHeader title="Reports" onFilterPress={() => setFilterVisible(true)} />
        <View style={styles.pieContainer}>
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
            absolute
          />
        </View>
    <CategoryList 
     startDate={startDate}
     endDate={endDate}
     setStartDate={setStartDate}
     setEndDate={setEndDate}
     onApplyFilter={handleApplyFilter}
     onResetFilter={handleReset}
    />
      <ReportFilterModal
            visible={isFilterVisible}
            onApply={handleApplyFilter}
            handleReset={handleReset}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
      </>
    );
  };

  const styles = StyleSheet.create({
    pieContainer: {
      // padding: 10,
      borderRadius: 12,
      backgroundColor: '#ffffff',
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
      textAlign: 'center',
    },
    barChart: {
      borderRadius: 12,
      padding: 0,
    },
    filterIconContainer: {
      alignItems: 'flex-end',
      padding: 5,
      marginRight:10
    },
  });

  export default Reports;
