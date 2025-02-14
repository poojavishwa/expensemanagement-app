import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.fabContainer}
      onPress={onPress} // Make sure it is passed
      activeOpacity={0.7}
    >
      <View style={styles.fabButton}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    top: -40, // Adjust position above the tab bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fbbc05',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 35,
    // elevation: 4, 
  },
});

export default CustomTabButton;
