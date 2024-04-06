import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../Screens/Auth/Profile';
import MyListingsScreen from '../Screens/MyListingsScreen';
import ListingViewScreen from '../Screens/ListingViewScreen';
import ReservationViewScreen from '../Screens/ReservationViewScreen';
import ChatScreen from '../Screens/ChatScreen';
import PrivacyNoticeScreen from '../Screens/PrivacyNoticeScreen';

const Stack = createStackNavigator();
export default function ProfileStackNav() {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name='profile-tab' component={Profile} />
    <Stack.Screen name='my-listings-tab' component={MyListingsScreen} />
    <Stack.Screen  name="reservation-tab" component={ReservationViewScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Privacy Notice" component={PrivacyNoticeScreen} />
    </Stack.Navigator>

  )
}