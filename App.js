import { ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import React from 'react';
import {View } from 'react-native';
import RegistrationScreen from './src/Screens/Auth/RegistrationScreen';
import LoginScreen from './src/Screens/Auth/LoginScreen';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/Navigations/TabNavigation";
import AuthStackNavigation from "./src/Navigations/AuthStackNavigation";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey='pk_test_ZXhvdGljLWRyYWtlLTE1LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <View className="flex-1 bg-white">
       <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <AuthStackNavigation />
          </NavigationContainer>
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}