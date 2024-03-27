import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ListingScreen from '../Screens/ListingScreen';
import ListingViewScreen from '../Screens/ListingViewScreen';
import ChatScreen from '../Screens/ChatScreen';

const Stack = createStackNavigator();

export default function ListingStackNavigation() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen options={{headerShown: false}} name="Listing Screen" component={ListingScreen} />
      <Stack.Screen name="Listing Info" component={ListingViewScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}