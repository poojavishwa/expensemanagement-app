import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";// If not using Expo, use react-native-vector-icons

interface HeaderProps {
    title: string;
    showFilter?: boolean;
    onFilterPress?: () => void; // Function when filter is pressed
}

const HomeHeader: React.FC<HeaderProps> = ({ title,showFilter = true, onFilterPress }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/capital.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>{title}</Text>

            {/* Conditionally render filter icon when title is "Reports" */}
           { showFilter ?(title === "Reports" && (
                <TouchableOpacity onPress={onFilterPress} style={styles.filterIcon}>
                 <Icon name="filter" size={24} color="#000" />
                </TouchableOpacity>
            )): (
                    <View style={styles.icon} /> // Placeholder for spacing
                  )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    logo: {
        width: 40,
        height: 60,
        resizeMode: "contain",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    filterIcon: {
        padding: 8,
    },
    icon: {
        width: 40,
        alignItems: "center",
      },
});

export default HomeHeader;
