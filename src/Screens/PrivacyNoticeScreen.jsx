import { View, Text } from 'react-native';
import React from 'react';

export default function PrivacyNoticeScreen() {
  return (
    <View className="px-4 py-4">
      <Text className="text-xl font-bold mb-4 text-center">Privacy Notice</Text>
      <Text>We are committed to protecting your privacy. This Privacy Notice explains our practices regarding the collection, use, and disclosure of information that we receive through our mobile application.</Text>
      
      <Text className="mt-4 font-bold">Information Collection and Use:</Text>
      <Text>We collect information you provide directly to us, such as when you create or modify your account, send us an email, or otherwise communicate with us. This information may include your name, email address, and any other information you choose to provide.</Text>
      
      <Text className="mt-4 font-bold">Data Security:</Text>
      <Text>We are committed to protecting the security of your information. We use a variety of industry-standard security technologies and procedures to help protect your information from unauthorized access, use, or disclosure.</Text>
      
      <Text className="mt-4 font-bold">Changes to This Privacy Notice:</Text>
      <Text>We may update this Privacy Notice from time to time. We will notify you of any changes by posting the new Privacy Notice on this page.</Text>
      
      <Text className="mt-4">By using our mobile application, you agree to the collection and use of information in accordance with this Privacy Notice.</Text>
    </View>
  );
}
