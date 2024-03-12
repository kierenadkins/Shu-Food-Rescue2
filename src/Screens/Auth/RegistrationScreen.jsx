import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded || password !== confirmPassword) {
      setPasswordsMatch(false); // Set passwordsMatch to false if passwords don't match
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 ">
      {!pendingVerification && (
        <View className ="p-8">
          <View>
            <Image source={require('./../../../assets/shu-logo.jpg')} className="w-full h-[200px] object-cover"></Image>
          </View>
          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              value={confirmPassword}
              placeholder="Confirm Password..." // New password confirmation field
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => {
                setConfirmPassword(confirmPassword);
                setPasswordsMatch(true); // Reset passwordsMatch state when user changes confirm password
              }}
            />
          </View>

          {!passwordsMatch && (
            <Text style={{ color: 'red', marginBottom: 10 }}>
              Passwords do not match. Please try again.
            </Text>
          )}

          <TouchableOpacity className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:py-3 md:px-6"  onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View className ="flex items-center justify-center h-screen p-8">
          <View className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4">
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-4" onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
