import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getFirestore, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Constants from '../consts/consts';
import uuid from 'react-native-uuid';

export default function ListingViewScreen() {
  const { params } = useRoute();
  const { user } = useUser();
  const navigation = useNavigation();
  const db = getFirestore(app);
  const [date, setDate] = useState();

  useEffect(() => {
    console.log(params);
    // Check if params has data and foodDate
    if (params) {
      const milliseconds = (params.listinginfo.foodDate.seconds * 1000) + (params.listinginfo.foodDate.nanoseconds / 1000000);
      const listingDate = new Date(milliseconds).toDateString();
      setDate(listingDate);
    }
  }, [params]);

  const reservePost = async () => {
    try {
      const q = query(collection(db, "listings"), where("title", "==", params.listinginfo.title));
      const snapshot = await getDocs(q);
  
      snapshot.forEach(async doc => {
        const docRef = doc.ref;
        const docData = doc.data();
  
        if (docData.status != Constants.ListingStatus.Active) {
          reserveListingNoLongerAvailableAlert();
        } else {
          const newData = { 
            status: Constants.ListingStatus.PendingCollection, 
            reservationUserId: user.id,
            reservationId: uuid.v4()
          };
          await updateDoc(docRef, newData);
          console.log("Successfully reserved");
          console.log(newData);
          reservedAlert(newData.reservationId);
        }
      });
  
    } catch (error) {
      console.error("Error occurred while reserving post:", error);
      // Handle the error appropriately
    }
  };

  const deleteUserPostAlert = () => {
    Alert.alert("Do you want to delete?", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => deleteFromDatabase()
      },
      {
        text: "No",
        style: 'cancel',
      }
    ])
  };

  const reserveListingAlert = (id) => {
    Alert.alert("Do you want to reserve this item?", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => reservePost(id)
      },
      {
        text: "No",
        style: 'cancel',
      }
    ])
  };

  const reserveListingNoLongerAvailableAlert = () => {
    Alert.alert("This Item Is No Longer Available", [
      {
        text: "OK",
        onPress: () => navigation.goBack()
      },
    ])
  };

  const reservedAlert = (id) => {
    console.log(id);
    Alert.alert("Success!", "You have successfully reserved this listing. Please message the user for collection.", [
      {
        text: "OK",
        onPress: () => navigation.push('Chat', { listingId: id })
      },
    ])
  };

  const deleteFromDatabase = async () => {
    const q = query(collection(db, "listings"), where("title", "==", params.listinginfo.title));
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      deleteDoc(doc.ref).then(resp => {
        console.log("Deleted");
        navigation.goBack();
      }).catch(error => {
        console.error("Error deleting document: ", error);
      });
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView contentContainerClassName="flex-grow">
          <View className="p-4">
            <Text className="text-2xl font-bold text-center mb-4">{params.listinginfo.title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {params.listinginfo.images.map((uri, index) => (
                <Image key={index} source={{ uri }} className="w-52 h-52 rounded-lg mr-4" />
              ))}
            </ScrollView>
            <Text className="text-lg mb-2">Description</Text>
            <View className="bg-gray-200 p-2 rounded-lg mb-4">
              <Text>{params.listinginfo.description}</Text>
            </View>
            <Text className="text-lg mb-2">Food Date</Text>
            <View className="bg-gray-200 p-2 rounded-lg mb-4">
              <Text>{params.listinginfo.foodDateType}: {date}</Text>
            </View>
            <Text className="text-lg mb-2">Location</Text>
            <View className="bg-gray-200 p-2 rounded-lg mb-4">
              <Text>{params.listinginfo.location}</Text>
            </View>
          </View>
        </ScrollView>
        <View className="absolute bottom-8 left-1/4 w-1/2">
          {user?.id === params.listinginfo.userId ? (
            <TouchableOpacity onPress={deleteUserPostAlert} className="bg-red-500 py-4 px-6 rounded-full ">
              <Text className="text-white text-center text-lg">Delete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={reserveListingAlert} className="bg-green-500 py-4 px-6 rounded-full  ">
              <Text className="text-white text-center text-lg">Reserve</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
