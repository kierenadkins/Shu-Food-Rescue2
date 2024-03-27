import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, updateDoc, getFirestore } from 'firebase/firestore'; // Import Firestore functions according to your Firebase setup
import Constants from '../../consts/consts'; // Import your constants file
import {app} from "../../../firebaseConfig";


export default function ReservedListingInformation ({ listings }) {
  const navigation = useNavigation();
  const db = getFirestore(app);

  const cancelReservation = (index) => {
    Alert.alert("You are cancelling a reservation food listing", "Are you sure?", [
      {
        text: "yes",
        onPress: () => cancelReservePost(index)
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const chat = (index) => {
    const data = listings[index].reservationId;
    console.log(data);
    navigation.push('Chat', { listingId: data });
  };

  const cancelReservePost = async (index) => {
    try {
      const q = query(collection(db, "listings"), where("title", "==", listings[index].title));
      const snapshot = await getDocs(q);
  
      snapshot.forEach(async doc => {
        const docRef = doc.ref;
        const docData = doc.data();
  
        const newData = { 
          status: Constants.ListingStatus.Active, 
          reservationUserId: null 
        };
          await updateDoc(docRef, newData);
          console.log("Successfully cancelled reserved");
          navigation.goBack();
      });
  
    } catch (error) {
      console.error("Error occurred while reserving post:", error);
      // Handle the error appropriately
    }
  };

  return (
    <View style={styles.container}>
      {listings.map((listing, index) => (
          <View style={styles.rectangle}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: listing.images[0] }}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <View>
              <View style={styles.row}>
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.title}>X</Text>
              </View>
                <View style={styles.row}>
                  <Text style={styles.subtitle}>{listing.userFirstName} {listing.userLastName}</Text>
                  <TouchableOpacity onPress={() => cancelReservation(index)}>
                    <Text style={styles.subtitle}>Cancel</Text>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.subtitle}>{listing.location}</Text>
                <TouchableOpacity onPress={() => chat(index)}>
                    <Text style={styles.subtitle}>Chat</Text>
                  </TouchableOpacity>
                
              </View>
            </View>
          </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rectangle: {
    flexDirection: 'row',
    width: "95%",
    height: 115,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    marginBottom: 10, 
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  subtitle: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});