import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createTables } from './db/categoryDB';
import BottomNavigation from './navigation/BottomNavigation';
import { FilterProvider } from './context/FilterContext';


const App = () => {
  createTables();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
