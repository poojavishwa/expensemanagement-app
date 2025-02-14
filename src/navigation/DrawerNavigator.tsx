import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomHeader, { MenuButton } from '../component/CustomHeader';
import BottomNavigation from './BottomNavigation';
import TransactionNavigation from './TransactionNavigator';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    screenOptions={({ navigation }) => ({
      gestureEnabled: true, // Allow swipe back
      swipeEnabled: true, 
      drawerStyle: { backgroundColor: '#fff', width: 240 },
      headerTitle: 'Expense Tracker',
      headerTitleAlign: 'center',
      headerLeft: () => <MenuButton navigation={navigation} />,
      headerRight: () => <CustomHeader navigation={navigation} />,
    })}
    >
      <Drawer.Screen name="Home" component={BottomNavigation} />
      <Drawer.Screen name="Transaction" component={TransactionNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
