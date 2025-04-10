import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  showFilter?: boolean; 
  onFilterPress?: () => void; 
}

const ExpenseHeader: React.FC<HeaderProps> = ({ title, showFilter = true, onFilterPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {showFilter ? (
        <TouchableOpacity onPress={onFilterPress} style={styles.icon}>
          <Icon name="filter" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.icon} /> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    width: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

export default ExpenseHeader;
