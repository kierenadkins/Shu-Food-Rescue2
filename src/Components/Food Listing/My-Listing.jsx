import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs, updateDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import Constants from '../../consts/consts';
import { app } from "../../../firebaseConfig";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function MyListing({ listings }) {
  const navigation = useNavigation();
  const db = getFirestore(app);

  const chat = (index) => {
    const data = listings[index].reservationId;
    console.log(data);
    navigation.push('Chat', { listingId: data });
  };

  const deleteUserPostAlert = (index) => {
    Alert.alert("Do you want to delete?", "Are you sure?", [
      {
        text: "yes",
        onPress: () => deleteFromDatabase(index)
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const collectedUserPostAlert = (index) => {
    Alert.alert("Are you sure this listing has been collected?", [
      {
        text: "yes",
        onPress: () => collectListing(index)
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const collectListing = async (index) => {
    try {
      const q = query(collection(db, "listings"), where("title", "==", listings[index].title));
      const snapshot = await getDocs(q);

      snapshot.forEach(async doc => {
        const docRef = doc.ref;
        const docData = doc.data();

        const newData = {
          status: Constants.ListingStatus.Collected,
        };
        await updateDoc(docRef, newData);
        console.log("Successfully collected");
        navigation.goBack();
      });

    } catch (error) {
      console.error("Error occurred while collecting post:", error);
    }
  }

  const deleteFromDatabase = async (index) => {
    try {
      const q = query(collection(db, "listings"), where("title", "==", listings[index].title));
      const snapshot = await getDocs(q);

      snapshot.forEach(doc => {
        deleteDoc(doc.ref).then(resp => {
          console.log("Deleted");
          navigation.goBack();
        }).catch(error => {
          console.error("Error deleting document: ", error);
        });
      });
    } catch (error) {
      console.error("Error occurred while deleting post:", error);
    }
  };

  return (
    <View style={styles.container}>
      {listings.map((listing, index) => (
        <View style={styles.rectangle} key={index}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: listing.images[0] }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.title}>{listing.title}</Text>
              <Text style={styles.subtitle}>Status: {listing.status}</Text>
              <Text style={styles.subtitle}>Removal Date: 29/03/2024 </Text>
            </View>
            <View style={styles.row}>
              {listing.status === "PendingCollection" && (
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => chat(index)} style={styles.buttonContainer}>
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                    <Text style={styles.subtitle}>Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => collectedUserPostAlert(index)} style={styles.buttonContainer}>
                    <Entypo name="thumbs-up" size={24} color="black" />
                    <Text style={styles.subtitle}>Collected</Text>
                  </TouchableOpacity>
                </View>
              )}

              {listing.status !== "PendingCollection" && (
                <View style={styles.buttonInactiveContainer}>
                  <Ionicons name="chatbubble-outline" size={24} color="black" />
                  <Text style={styles.subtitle}>Chat</Text>
                </View>
              )}

              <TouchableOpacity onPress={() => deleteUserPostAlert(index)} style={styles.buttonContainer}>
                <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
                <Text style={styles.subtitle}>Delete</Text>
              </TouchableOpacity>

              {listing.status === "Collected" && (
                <TouchableOpacity onPress={() => LeaveReview(index)} style={styles.buttonContainer}>
                  <MaterialIcons name="rate-review" size={24} color="black" />
                  <Text style={styles.subtitle}>Leave Review</Text>
                </TouchableOpacity>
              )}
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
    justifyContent: 'justify-start',
  },
  buttonContainer: {
    marginRight: 10
  },
  buttonInactiveContainer: {
    marginRight: 20,
    opacity: 0.5,
  }
});
