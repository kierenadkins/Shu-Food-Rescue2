import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getFirestore, query, where, getDocs, updateDoc } from 'firebase/firestore'; // Added missing imports
import { app } from '../../firebaseConfig';
import Constants from '../consts/consts';
import uuid from 'react-native-uuid';

export default function ListingViewScreen() {
  const { params } = useRoute();
  const { user } = useUser();
  const navigation = useNavigation();
  const db = getFirestore(app);

  useEffect(() => {
    console.log(params);
  }, []);

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
          reservedAlert();
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
        text: "yes",
        onPress: () => deleteFromDatabase()
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const reserveListingAlert = () => {
    Alert.alert("Do you want to resevere this item", "Are you sure?", [
      {
        text: "yes",
        onPress: () => reservePost()
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const reserveListingNoLongerAvailableAlert = () => {
    Alert.alert("This Item Is No Longer Available", [
      {
        text: "ok",
        onPress: () => navigation.goBack()
      },
    ])
  };

  const reservedAlert = () => {
    Alert.alert("You have successfully reserved this listing", "Please message the user for collection", [
      {
        text: "ok",
        onPress: () => navigation.goBack()
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
        console.error("Error deleting document: ", error); // Handle error if delete operation fails
      });
    });
  };

  return (
    <View className="flex-1 items-center">
      <View className="border-2 border-black rounded-lg w-11/12 h-5/6 p-6">
        <View className="flex-1">
          <Text className="text-lg font-bold text-center pb-2">{params.listinginfo.title}</Text>

          <View className="h-1/4 border border-black rounded-lg mb-4">
            <ScrollView horizontal>
              {params.listinginfo.images.map((uri, index) => (
                <View key={index} className="flex-row justify-center relative">
                  <Image source={{ uri }} style={{width: 125, height: "90%", borderRadius: 15, borderWidth: 1, borderColor: "black" }} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View>
            <Text>{params.listinginfo.description}</Text>
          </View>
          <View>
            <Text>Food Date</Text>
          </View>
          <View>
            <Text>Location</Text>
          </View>
          <View>
            <Text>Type</Text>
          </View>
          <View>
            <Text>User Name & User Rating</Text>
            <Text>Date Posted</Text>
          </View>

          {user?.id == params.listinginfo.userId ? (
            <TouchableOpacity onPress={deleteUserPostAlert} className="p-3 w-36 bg-red-500 rounded-lg mt-4 self-center">
              <Text className="text-white text-center text-base">Delete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={reserveListingAlert} className="p-3 w-36 bg-white border-2 border-black rounded-lg mt-4 self-center">
              <Text className="text-black text-center text-base">Reserve</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
