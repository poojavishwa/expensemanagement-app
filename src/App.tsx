import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createTables } from './db/categoryDB';


const App = () => {
  createTables();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
