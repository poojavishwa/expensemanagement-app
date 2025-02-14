import { createStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export const MainNavigation = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
    <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);
