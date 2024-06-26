import { ScrollView, Text } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import MyListing from '../Components/Food Listing/My-Listing';

export default function MyListingsScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getUserListing = useCallback(async () => {
    setIsLoading(true);
    try {
      setMyListings([])
      const q = query(collection(db, "listings"), where("userId", "==", user?.id));
      const snapshot = await getDocs(q);
      const listingsData = [];
      snapshot.forEach(doc => {
        listingsData.push(doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setMyListings(listingsData);

    } catch (error) {
      console.error("Error fetching user listings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, db]);

  useEffect(() => {
    user && getUserListing();
  }, [user, getUserListing]);

  return (
    <>
      <ScrollView>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          myListings.length === 0 ? (
            <Text>No listings available</Text>
          ) : (
           <MyListing listings={myListings}></MyListing>
          )
        )}
      </ScrollView>
    </>
  );
}
