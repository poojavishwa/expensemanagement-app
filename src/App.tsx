import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createTables } from './db/categoryDB';
import BottomNavigation from './navigation/BottomNavigation';
import Launcher from './screens/Louncher';
import BannerAdds from './adds/BannerAdds';


const App = () => {
  const [showLauncher, setShowLauncher] = useState(true);

  useEffect(() => {
    createTables(); // Ensure tables are created

    // Hide the launcher after 5 seconds
    const timer = setTimeout(() => {
      setShowLauncher(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {showLauncher ? (
        <Launcher /> // Show launcher for 5 seconds
      ) : (
        <NavigationContainer>
          <BannerAdds />
          <BottomNavigation />
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
};

export default App;
