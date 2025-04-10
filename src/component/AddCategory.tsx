import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { addCategory } from '../db/categoryDB';
import { BlurView } from '@react-native-community/blur';  // Import for blur effect

interface AddCategoryProps {
  visible: boolean;
  type: 'income' | 'expense'; // Add type prop
  onClose: () => void;
  onSave: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ visible, type, onClose, onSave }) => {
  const colorScheme = useColorScheme();
      const isDarkMode = colorScheme === 'dark';
  const [categoryName, setCategoryName] = useState('');
  const slideAnim = useState(new Animated.Value(Platform.OS === 'ios' ? 300 : 500))[0]; // Initial position offscreen (300 for iOS and 500 for Android)

  const handleSave = () => {
    if (!categoryName) return alert('Please enter a category name');

    addCategory(categoryName, type, () => {
      onSave();
      setCategoryName('');
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      // Slide up when the modal is visible
      Animated.spring(slideAnim, {
        toValue: 0,  // Final position (slide to the top)
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down when the modal is not visible
      Animated.spring(slideAnim, {
        toValue: Platform.OS === 'ios' ? 300 : 500, // Reset to off-screen position
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      {visible && (
        // Add BlurView for background blur
        <BlurView
          style={styles.blurContainer}
          blurType="light" // Blur style, can be adjusted (light, dark, extraLight, etc.)
          blurAmount={7} // Amount of blur
        >
          <TouchableOpacity style={styles.background} onPress={onClose} />
        </BlurView>
      )}

      <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.modalContent}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.modalTitle}>Add {type} Category</Text>
            <TextInput
             style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9', color: isDarkMode ? '#fff' : '#000' }]}
              placeholder="Category Name"
              placeholderTextColor={isDarkMode ? '#aaa' : '#555'} 
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it's above other content
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'stretch',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
  },
  saveButton: {
    backgroundColor: '#0072ea',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCategory;
