import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';

const Stack = createStackNavigator();

export default function AuthStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown: false}} name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}