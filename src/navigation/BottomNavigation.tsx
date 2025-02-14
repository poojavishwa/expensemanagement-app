import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Records from '../screens/Records';
import Reports from '../screens/Reports';
import CustomTabButton from '../component/CustomTabButton';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Records' ? 'file-invoice-dollar' : 'chart-bar';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Records" component={Records} />

      {/* Floating + Button */}
      <Tab.Screen
        name="Add"
        component={Records} // This won't be used
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} onPress={() => navigation.navigate('Transaction')}>
              <Icon name="plus" size={24} color="#000" />
            </CustomTabButton>
          ),
        }}
      />

      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
