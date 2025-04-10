import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image, Text, TouchableOpacity } from 'react-native';
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
        tabBarIcon: ({ focused, color, size }) => {
          let imageSource;

          if (route.name === "Transactions") {
            imageSource = require("../assets/rupee.png")
          } else if (route.name === "Reports") {
            imageSource = require("../assets/report.png") // Active image
          }
          return <Image
            source={imageSource}
            style={{ width: 26, height: 26, resizeMode: "contain", tintColor: focused ? "#007AFF" : "#999" }}
          />;
        },
      })}
    >
      <Tab.Screen name="Transactions" component={Records} options={{
        headerTitle: 'Records',
      }} />
      <Tab.Screen
        name="AllIncome"
        component={Incomes}
        options={{
          // headerTitle: 'Records',
          tabBarButton: () => null, // Hides the tab button
        }}
      />

      <Tab.Screen
        name="Add"
        component={TransactionNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} onPress={() => navigation.navigate('Transaction')}>
              <Icon name="plus" size={24} color="white" />
            </CustomTabButton>
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={Expenses}
        options={{
          // headerTitle: 'Records',
          tabBarButton: () => null, // Hides the tab button
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: "Reports", // Ensures the label is shown
          tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/report.png")}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  tintColor: focused ? "#007AFF" : "#999",
                }}
              />
          ),
        }}
      />

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
                source={require('../assets/halfLogo.png')}
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
        <Stack.Screen
          name="Reports"
          component={Reports} // ADD REPORTS SCREEN
          options={{ headerTitle: 'Reports', headerShown: false, headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </>
  );
};


export default BottomNavigation;
