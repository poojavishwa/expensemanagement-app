import { View, Text, Platform, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
  });
  
const interstitialAdd = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
        });
    
        const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
          if (Platform.OS === 'ios') {
            // Prevent the close button from being unreachable by hiding the status bar on iOS
            StatusBar.setHidden(true)
          }
        });
    
        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          if (Platform.OS === 'ios') {
            StatusBar.setHidden(false)
          }
        });
    
        // Start loading the interstitial straight away
        interstitial.load();
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeOpened();
          unsubscribeClosed();
        };
      }, []);
    
      // No advert ready to show yet
      if (!loaded) {
        return null;
      }

  return (
    <View>
      <Text>interstitial</Text>
    </View>
  )
}

export default interstitialAdd