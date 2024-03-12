import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from '@react-navigation/native';
 
export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.push('Registration')};
 
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  
  
  return (
    <SafeAreaView className="bg-white flex-1 ">
        <View>
            <Image source={require('./../../../assets/shu-logo.jpg')} className="w-full h-[200px] object-cover"></Image>
        </View>
        <View className ="p-8">
        <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
        </View>
    
        <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        </View>
        <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:py-3 md:px-6" onPress={onSignInPress}>
          <Text className="text-center">Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4" onPress={handlePress}>
          <Text className="text-center">Not got an account?</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
