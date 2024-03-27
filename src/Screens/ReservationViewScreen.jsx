import { ScrollView, Text } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import ReservedListingInformation from '../Components/Food Listing/Reserved-Listing-Information';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ReservationViewScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getUserListing = useCallback(async () => {
    setIsLoading(true);
    try {
      setMyListings([])
      const q = query(collection(db, "listings"), where("reservationUserId", "==", user?.id));
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
            <Text>No reservations available</Text>
          ) : (
            <ReservedListingInformation listings={myListings} />
          )
        )}
      </ScrollView>
    </>
  );
}
