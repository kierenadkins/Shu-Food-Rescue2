import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import checkList from './../../../assets/checkList.png'
import chats from './../../../assets/chat.jpg'
import changePassword from './../../../assets/changePassword.png'
import logout from './../../../assets/logout.png'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native';
import { useAuth } from "@clerk/clerk-expo";

export default function Profile() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded,signOut } = useAuth();

  const menu =[
    {
        id: 1,
        name: "My Listings",
        icon: checkList,
        path: 'my-listings-tab'
    },
    {
        id: 2,
        name: "Reserved",
        icon: chats,
        path: 'reservation-tab'
    },
    {
        id: 3,
        name: "Change Password",
        icon: changePassword,
        url: 'https://exotic-drake-15.accounts.dev/user'
    },
    {
        id: 4,
        name: "Logout",
        icon: logout,
    }
  ];

  const onPressPrivacy = () => {
    navigation.navigate("Privacy Notice");
  }
  

  const onTouchablePress = async (item) => {
    if (item.path) {
      navigation.navigate(item.path);
    } else if (item.url) {
      const supported = await Linking.canOpenURL(item.url);
      if (supported) {
        await Linking.openURL(item.url);
      } else {
        console.log("Cannot open URL: ", item.url);
      }
    }
    else{
      signOut();
    }
  };

  return (
    <View>
      <View className=" items-center mt-10">
        <Image source={{ uri: user?.imageUrl }} className="w-[100px] h-[100px] rounded-full" />
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="text-[18px] mt-2 text-grey-50">{user?.primaryEmailAddress.emailAddress}</Text>
      </View>

      <FlatList
        data={menu}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onTouchablePress(item)} className="flex-1 p-3 border-[1px] items-center m-4 rounded-lg border-blue-400 bg-shu-pink mx-2 mt-4  ">
            {item.icon && <Image className="w-[50px] h-[50px]" source={item?.icon} />}
            <Text className="text-[12px] mt-2 text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={onPressPrivacy} className="items-center">
        <Text className="text-cyan-800">Privacy Notice</Text>
      </TouchableOpacity>
    </View>
  );
}
