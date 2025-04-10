import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createTables } from './db/categoryDB';
import BottomNavigation from './navigation/BottomNavigation';
import Launcher from './screens/Louncher';
import BannerAdds from './adds/BannerAdds';
import ReactNativeBiometrics from 'react-native-biometrics';
import { View, Text, Button, Alert } from 'react-native';
import { loadAppOpenAd, showAppOpenAd } from './adds/AppOpenAdManager';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

const App = () => {
  const [showLauncher, setShowLauncher] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    createTables(); // Ensure tables are created
    loadAppOpenAd();
    authenticateUser();

    // Hide the launcher after 5 seconds
    const timer = setTimeout(() => {
      setShowLauncher(false);
      showAppOpenAd();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const authenticateUser = async () => {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (available && biometryType) { 
      rnBiometrics
        .simplePrompt({ promptMessage: 'Authenticate with Biometrics or Device PIN' })
        .then(result => {
          if (result.success) {
            setAuthenticated(true);
          } else {
            showLockAlert();
          }
        })
        .catch(() => {
          showLockAlert();
        });
    } else {
      // Fallback to Device PIN if biometrics are unavailable
      rnBiometrics
        .createKeys()
        .then(() => {
          rnBiometrics.biometricKeysExist().then(({ keysExist }) => {
            if (keysExist) {
              setAuthenticated(true);
            } else {
              Alert.alert('Authentication Failed', 'Please set up a PIN to access the app.');
            }
          });
        })
        .catch(() => {
          showLockAlert();
        });
    }
  };

  const showLockAlert = () => {
    Alert.alert(
      'Spend Sage is Locked',
      'Authentication is required to continue.',
      [{ text: 'Retry', onPress: authenticateUser }]
    );
  };

  if (!authenticated) {
    return <View />;  
  }

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
