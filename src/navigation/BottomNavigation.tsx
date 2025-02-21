import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image, TouchableOpacity } from 'react-native';
import Records from '../screens/Records';
import Reports from '../screens/Reports';
import CustomTabButton from '../component/CustomTabButton';
import TransactionNavigator from './TransactionNavigator';
import Expenses from '../screens/Expenses';
import Incomes from '../screens/Incomes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Records' ? 'file-invoice-dollar' : 'chart-bar';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Records" component={Records}  options={{
          headerTitle: 'Records',
        }}/>
 <Tab.Screen
        name="AllIncome"
        component={Incomes}
        options={{
          headerTitle: 'Records',
          tabBarButton: () => null, // Hides the tab button
        }}
      />

      <Tab.Screen
        name="Add"
        component={TransactionNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} onPress={() => navigation.navigate('Transaction')}>
              <Icon name="plus" size={24} color="#000"  />
            </CustomTabButton>
          ),
        }}
      />
        <Tab.Screen
        name="AllExpenses"
        component={Expenses}
        options={{
          headerTitle: 'Records',
          tabBarButton: () => null, // Hides the tab button
        }}
      />
      <Tab.Screen name="Reports" component={Reports}  options={{
          headerTitle: 'Report',
        }}/>

    </Tab.Navigator>
  );
};

const BottomNavigation = () => {
  return (
    <>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerLeft: () => (
            <Image
              source={require('../assets/capital.png')}
              style={{ width: 40, height: 60, resizeMode: 'contain', marginLeft: 15 }}
            />
          ),
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionNavigator}
        options={{
          headerShown: true,
          headerTitle: 'Add Transaction',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="AllExpenses"
        component={Expenses}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'Expenses',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="AllIncome"
        component={Incomes}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'Incomes',
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
   </>
  );
};


export default BottomNavigation;
