import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Image, KeyboardAvoidingView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // New state variable
  const [passwordValidationError, setPasswordValidationError] = useState(""); // New state variable
  const [emailValidationError, setEmailValidationError] = useState(""); // New state variable
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded || password !== confirmPassword) {
      setPasswordsMatch(false); // Set passwordsMatch to false if passwords don't match
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setPasswordValidationError("Password must contain at least one capital letter and one special character.");
      return;
    }

    // Validate email
    const emailRegex = /@student.shu.ac.uk$/;
    if (!emailRegex.test(emailAddress)) {
      setEmailValidationError("Email must be from @student.shu.ac.uk domain.");
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView>
          {!pendingVerification && (
            <View style={{ padding: 20 }}>
              <View>
                <Image source={require('./../../../assets/shu-logo.jpg')} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              </View>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  autoCapitalize="none"
                  value={firstName}
                  placeholder="First Name..."
                  onChangeText={(firstName) => setFirstName(firstName)}
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  autoCapitalize="none"
                  value={lastName}
                  placeholder="Last Name..."
                  onChangeText={(lastName) => setLastName(lastName)}
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Email..."
                  onChangeText={(email) => setEmailAddress(email)}
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  value={password}
                  placeholder="Password..."
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  style={{ padding: 10 }}
                />
              </View>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  value={confirmPassword}
                  placeholder="Confirm Password..." // New password confirmation field
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                  onChangeText={(confirmPassword) => {
                    setConfirmPassword(confirmPassword);
                    setPasswordsMatch(true); // Reset passwordsMatch state when user changes confirm password
                  }}
                  style={{ padding: 10 }}
                />
              </View>
              {!passwordsMatch && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  Passwords do not match. Please try again.
                </Text>
              )}
              {passwordValidationError !== "" && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  {passwordValidationError}
                </Text>
              )}
              {emailValidationError !== "" && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  {emailValidationError}
                </Text>
              )}
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 }}
                onPress={onSignUpPress}
              >
                <Text style={{ color: 'white' }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          )}
          {pendingVerification && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <View style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10 }}>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                  style={{ padding: 10 }}
                />
              </View>
              <TouchableOpacity
                style={{ border: '1px solid #ccc', borderRadius: 5, marginBottom: 10, backgroundColor: 'blue', padding: 10 }}
                onPress={onPressVerify}
              >
                <Text style={{ color: 'white' }}>Verify Email</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
